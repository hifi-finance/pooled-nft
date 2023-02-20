// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";

contract Withdraw_Test is ERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_IdsIsEmpty() external {
        uint256[] memory ids;
        vm.expectRevert(IERC721Pool.ERC721Pool__InsufficientIn.selector);
        erc721Pool.withdraw(ids);
    }

    /// @dev Common set up for withdraw
    function setUpWithdraw(uint256[] memory ids) internal {
        vm.assume(ids.length > 0);

        //assume each Ids value is unique
        for (uint256 i = 0; i < ids.length; i++) {
            for (uint256 j = i + 1; j < ids.length; j++) {
                vm.assume(ids[i] != ids[j]);
            }
        }
        // mint nft to erc721Pool
        mintNft(address(erc721Pool), ids);
        // Mint erc721Pool tokens so that we have what to burn.
        erc721Pool.__godMode_mint(users.alice, ids.length * 10**18);
        erc721Pool.__godMode_setHoldings(ids);
        changePrank(users.alice);
    }

    /// @dev it should burn ids.length * 10 ** 18 erc721Pool tokens.
    function testFuzz_Withdraw_BurnPoolTokens(uint256[] memory ids) external {
        setUpWithdraw(ids);
        uint256 previousBalance = erc721Pool.balanceOf(users.alice);
        erc721Pool.withdraw(ids);
        uint256 actualBalance = erc721Pool.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance - ids.length * 10**18;
        assertEq(actualBalance, expectedBalance, "burn erc721Pool tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Withdraw_RemoveAssetTokenIdsfromHoldings(uint256[] memory ids) external {
        setUpWithdraw(ids);
        uint256 previousHoldingsLength = erc721Pool.holdingsLength();
        erc721Pool.withdraw(ids);
        uint256 actualHoldingsLength = erc721Pool.holdingsLength();
        uint256 expectedHoldingsLength = previousHoldingsLength - ids.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should transfer nft from erc721Pool contract to beneficiary
    function testFuzz_Withdraw_TransferNftIdsToBeneficiary(uint256[] memory ids) external {
        setUpWithdraw(ids);
        uint256 previousBalance = nft.balanceOf(users.alice);
        erc721Pool.withdraw(ids);
        uint256 actualBalance = nft.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + ids.length;
        assertEq(actualBalance, expectedBalance, "transfer nft");
    }

    /// @dev it should emit Withdraw event.
    function testFuzz_Withdraw_Event(uint256[] memory ids) external {
        setUpWithdraw(ids);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Withdraw(ids, users.alice);
        erc721Pool.withdraw(ids);
    }
}
