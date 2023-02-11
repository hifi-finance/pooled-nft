// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IPool } from "contracts/IPool.sol";
import { PoolTest } from "../Pool.t.sol";
import { SigUtils } from "test/foundry/utils/SigUtils.sol";
import { IERC20Wnft } from "contracts/IERC20Wnft.sol";

contract RedeemWithSignature_Test is PoolTest {
    /// @dev Common set up for redeemWithSignature
    function setUpRedeemWithSignature(uint256[] memory outIds) internal {
        vm.assume(outIds.length != 0);
        //assume each inIds value is unique
        for (uint256 i = 0; i < outIds.length; i++) {
            for (uint256 j = i + 1; j < outIds.length; j++) {
                vm.assume(outIds[i] != outIds[j]);
            }
        }
        uint256 inAmount = outIds.length * 10**18;
        // mint nft to pool
        mintNft(address(pool), outIds);
        pool.__godMode_mint(users.alice, inAmount);
    }

    /// @dev ERC2612 permit signature
    function getPermitSignature(uint256 inAmount)
        internal
        view
        returns (bytes memory signature, SigUtils.Permit memory permit)
    {
        permit = SigUtils.Permit({
            owner: users.alice,
            spender: address(pool),
            value: inAmount,
            nonce: pool.nonces(users.alice),
            deadline: 1 days
        });
        bytes32 digest = sigUtils.getTypedDataHash(permit);
        uint256 privateKey = uint256(keccak256(abi.encodePacked("Alice")));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        signature = abi.encodePacked(r, s, v);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_ExpiredPermit(uint256[] memory outIds) external {
        setUpRedeemWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        // fast forward one second past the deadline
        vm.warp(permit.deadline + 1 seconds);
        vm.expectRevert(IERC20Wnft.ERC20Wnft__PermitExpired.selector);
        pool.redeemWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_RecoveredAddressIsInvalid(uint256[] memory outIds) external {
        setUpRedeemWithSignature(outIds);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(0);
        uint256 inAmount = outIds.length * 10**18;
        vm.expectRevert(IERC20Wnft.ERC20Wnft__InvalidSignature.selector);
        pool.redeemWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }

    /// @dev it should revert.
    function test_RevertWhen_PoolTokenInAmountIsZero() external {
        uint256[] memory outIds;
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vm.expectRevert(IPool.Pool__InsufficientIn.selector);
        pool.redeemWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_PoolTokenInOutMismatch(uint256 inAmount, uint256[] memory outIds) external {
        vm.assume(inAmount != 0);
        vm.assume(inAmount != outIds.length * 10**18);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vm.expectRevert(IPool.Pool__InOutMismatch.selector);
        pool.redeemWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_BeneficiaryZeroAddress(uint256[] memory outIds) external {
        vm.assume(outIds.length > 0);
        uint256 inAmount = outIds.length * 10**18;
        address beneficiary = address(0);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vm.expectRevert(IPool.Pool__InvalidTo.selector);
        pool.redeemWithSignature(inAmount, outIds, beneficiary, permit.deadline, signature);
    }

    /// @dev it should burn pool token inAmount.
    function testFuzz_Redeem_BurnPoolTokenInAmount(uint256[] memory outIds) external {
        setUpRedeemWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        uint256 previousBalance = pool.balanceOf(users.alice);
        pool.redeemWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
        uint256 actualBalance = pool.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance - inAmount;
        assertEq(actualBalance, expectedBalance, "burn pool tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Redeem_RemoveAssetTokenIdsfromHoldings(uint256[] memory outIds) external {
        setUpRedeemWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        pool.__godMode_setHoldings(outIds);
        uint256 previousHoldingsLength = pool.holdingsLength();
        pool.redeemWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
        uint256 actualHoldingsLength = pool.holdingsLength();
        uint256 expectedHoldingsLength = previousHoldingsLength - outIds.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should transfer nft from pool contract to beneficiary
    function testFuzz_Redeem_TransferNftOutIdsToBeneficiary(uint256[] memory outIds) external {
        setUpRedeemWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        uint256 previousBalance = nft.balanceOf(users.alice);
        pool.redeemWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
        uint256 actualBalance = nft.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + outIds.length;
        assertEq(actualBalance, expectedBalance, "transfer nft");
    }

    /// @dev it should emit Redeem event.
    function testFuzz_Redeem_Event(uint256[] memory outIds) external {
        setUpRedeemWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Redeem(inAmount, outIds, users.alice);
        pool.redeemWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }
}
