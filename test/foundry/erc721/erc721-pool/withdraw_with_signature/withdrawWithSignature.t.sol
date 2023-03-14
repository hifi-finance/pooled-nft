// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";
import { SigUtils } from "test/foundry/utils/SigUtils.sol";
import { IERC20Wnft } from "contracts/ERC-721/IERC20Wnft.sol";

contract WithdrawWithSignature_Test is ERC721Pool_Test {
    /// @dev Common set up for withdrawWithSignature
    function setUpWithdrawWithSignature(uint256[] memory ids) internal {
        vm.assume(ids.length != 0);
        //assume each Ids value is unique
        for (uint256 i = 0; i < ids.length; i++) {
            for (uint256 j = i + 1; j < ids.length; j++) {
                vm.assume(ids[i] != ids[j]);
            }
        }
        uint256 inAmount = ids.length * 10**18;
        // mint nft to erc721Pool
        mintNft(address(erc721Pool), ids);
        erc721Pool.__godMode_mint(users.alice, inAmount);
        erc721Pool.__godMode_setHoldings(ids);
    }

    /// @dev ERC2612 permit signature
    function getPermitSignature(uint256 inAmount)
        internal
        view
        returns (bytes memory signature, SigUtils.Permit memory permit)
    {
        permit = SigUtils.Permit({
            owner: users.alice,
            spender: address(erc721Pool),
            value: inAmount,
            nonce: erc721Pool.nonces(users.alice),
            deadline: 1 days
        });
        bytes32 digest = sigUtils.getTypedDataHash(permit);
        uint256 privateKey = uint256(keccak256(abi.encodePacked("Alice")));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        signature = abi.encodePacked(r, s, v);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_ExpiredPermit(uint256[] memory ids) external {
        setUpWithdrawWithSignature(ids);
        uint256 inAmount = ids.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        // fast forward one second past the deadline
        vm.warp(permit.deadline + 1 seconds);
        vm.expectRevert(IERC20Wnft.ERC20Wnft__PermitExpired.selector);
        erc721Pool.withdrawWithSignature(ids, permit.deadline, signature);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_RecoveredAddressIsInvalid(uint256[] memory ids) external {
        setUpWithdrawWithSignature(ids);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(0);
        vm.expectRevert(IERC20Wnft.ERC20Wnft__InvalidSignature.selector);
        erc721Pool.withdrawWithSignature(ids, permit.deadline, signature);
    }

    /// @dev it should revert.
    function test_RevertWhen_IdsIsEmpty() external {
        uint256[] memory ids;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(0);
        vm.expectRevert(IERC721Pool.ERC721Pool__InsufficientIn.selector);
        erc721Pool.withdrawWithSignature(ids, permit.deadline, signature);
    }

    /// @dev it should burn erc721Pool token inAmount.
    function testFuzz_Withdraw_BurnPoolTokenInAmount(uint256[] memory ids) external {
        setUpWithdrawWithSignature(ids);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(ids.length * 10**18);
        uint256 previousBalance = erc721Pool.balanceOf(users.alice);
        erc721Pool.withdrawWithSignature(ids, permit.deadline, signature);
        uint256 actualBalance = erc721Pool.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance - ids.length * 10**18;
        assertEq(actualBalance, expectedBalance, "burn erc721Pool tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Withdraw_RemoveAssetTokenIdsfromHoldings(uint256[] memory ids) external {
        setUpWithdrawWithSignature(ids);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(ids.length * 10**18);
        erc721Pool.__godMode_setHoldings(ids);
        uint256 previousHoldingsLength = erc721Pool.holdingsLength();
        erc721Pool.withdrawWithSignature(ids, permit.deadline, signature);
        uint256 actualHoldingsLength = erc721Pool.holdingsLength();
        uint256 expectedHoldingsLength = previousHoldingsLength - ids.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should transfer nft from erc721Pool contract to user
    function testFuzz_Withdraw_TransferNftIdsToBeneficiary(uint256[] memory ids) external {
        setUpWithdrawWithSignature(ids);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(ids.length * 10**18);
        uint256 previousBalance = nft.balanceOf(users.alice);
        erc721Pool.withdrawWithSignature(ids, permit.deadline, signature);
        uint256 actualBalance = nft.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + ids.length;
        assertEq(actualBalance, expectedBalance, "transfer nft");
    }

    /// @dev it should emit Withdraw event.
    function testFuzz_Withdraw_Event(uint256[] memory ids) external {
        setUpWithdrawWithSignature(ids);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(ids.length * 10**18);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Withdraw(ids, users.alice);
        erc721Pool.withdrawWithSignature(ids, permit.deadline, signature);
    }
}
