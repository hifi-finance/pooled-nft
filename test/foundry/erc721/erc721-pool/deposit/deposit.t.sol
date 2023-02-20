// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";

contract Deposit_Test is ERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_IdsIsEmpty() external {
        uint256[] memory ids;
        vm.expectRevert(IERC721Pool.ERC721Pool__InsufficientIn.selector);
        erc721Pool.deposit(ids);
    }

    /// @dev Common set up for deposit
    function setUpDeposit(uint256[] memory ids) internal {
        vm.assume(ids.length != 0);
        //assume each ids value is unique
        for (uint256 i = 0; i < ids.length; i++) {
            for (uint256 j = i + 1; j < ids.length; j++) {
                vm.assume(ids[i] != ids[j]);
            }
        }
        mintNft(users.alice, ids);
        nft.setApprovalForAll(address(erc721Pool), true);
    }

    /// @dev it should add given tokenIds to holdings.
    function testFuzz_Deposit_AddAssetTokenIdsToHoldings(uint256[] memory ids) external {
        setUpDeposit(ids);
        erc721Pool.deposit(ids);
        for (uint256 i; i < ids.length; ++i) {
            assertEq(erc721Pool.holdingAt(i), ids[i], "holding at");
        }
    }

    /// @dev it should transfer nft from msg.sender to erc721Pool contract.
    function testFuzz_Deposit_TransferNftFromSender(uint256[] memory ids) external {
        setUpDeposit(ids);
        uint256 previousBalance = nft.balanceOf(address(erc721Pool));
        erc721Pool.deposit(ids);
        uint256 actualBalance = nft.balanceOf(address(erc721Pool));
        uint256 expectedBalance = previousBalance + ids.length;
        assertEq(actualBalance, expectedBalance, "transferFrom");
    }

    /// @dev it should transfer erc721Pool tokens to user.
    function testFuzz_Deposit_TransferPoolTokensToBeneficiary(uint256[] memory ids) external {
        setUpDeposit(ids);
        uint256 previousBalance = erc721Pool.balanceOf(users.alice);
        erc721Pool.deposit(ids);
        uint256 actualBalance = erc721Pool.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + ids.length * 10**18;
        assertEq(actualBalance, expectedBalance, "deposit erc721Pool tokens");
    }

    /// @dev it should emit Deposit event.
    function testFuzz_Deposit_Event(uint256[] memory ids) external {
        setUpDeposit(ids);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Deposit(ids, users.alice);
        erc721Pool.deposit(ids);
    }
}
