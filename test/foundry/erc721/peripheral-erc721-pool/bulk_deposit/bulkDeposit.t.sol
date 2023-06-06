// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IPeripheralERC721Pool } from "contracts/ERC-721/IPeripheralERC721Pool.sol";
import { PeripheralERC721Pool_Test } from "../PeripheralERC721Pool.t.sol";
import "forge-std/console.sol";

contract BulkDeposit_Test is PeripheralERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_IdsIsEmpty() external {
        uint256[] memory ids;
        vm.expectRevert(IPeripheralERC721Pool.PeripheralERC721Pool__InsufficientIn.selector);
        peripheralERC721Pool.bulkDeposit(erc721Pool, ids);
    }

    /// @dev it should revert when the caller hasn't allowed this contract to transfer the NFTs.
    function test_RevertWhen_UnapprovedOperator(uint256[] memory ids) external {
        vm.assume(ids.length != 0);
        // do not call setApprovalForAll for this test.
        vm.expectRevert(IPeripheralERC721Pool.PeripheralERC721Pool__UnapprovedOperator.selector);
        peripheralERC721Pool.bulkDeposit(erc721Pool, ids);
    }

    /// @dev Common set up for bulkDeposit.
    function setUpBulkDeposit(uint256[] memory ids) internal {
        vm.assume(ids.length != 0);
        // assume each ids value is unique
        for (uint256 i = 0; i < ids.length; i++) {
            for (uint256 j = i + 1; j < ids.length; j++) {
                vm.assume(ids[i] != ids[j]);
            }
        }
        mintNft(users.alice, ids);
        nft.setApprovalForAll(address(peripheralERC721Pool), true);
    }

    /// @dev it should revert when caller tries to deposit NFTs that it doesn't own.
    function testFuzz_RevertWhen_CallerDoesntOwnNFTs(uint256[] memory ids) external {
        setUpBulkDeposit(ids);
        nft.transferFrom(users.alice, users.bob, ids[0]);

        // The transaction should revert because user doesn't own all of the NFTs they are trying to deposit.
        vm.expectRevert("ERC721: caller is not token owner or approved");
        peripheralERC721Pool.bulkDeposit(erc721Pool, ids);
    }

    /// @dev it should transfer nft from msg.sender to the pool contract.
    function testFuzz_BulkDeposit_TransferNftToPool(uint256[] memory ids) external {
        setUpBulkDeposit(ids);
        uint256 previousBalance = nft.balanceOf(address(erc721Pool));
        peripheralERC721Pool.bulkDeposit(erc721Pool, ids);
        uint256 actualBalance = nft.balanceOf(address(erc721Pool));
        uint256 expectedBalance = previousBalance + ids.length;
        assertEq(actualBalance, expectedBalance, "transfer NFT from caller to pool");
    }

    /// @dev it should transfer pool tokens to caller.
    function testFuzz_BulkDeposit_TransferPoolTokensToCaller(uint256[] memory ids) external {
        setUpBulkDeposit(ids);
        uint256 previousBalance = erc721Pool.balanceOf(users.alice);
        peripheralERC721Pool.bulkDeposit(erc721Pool, ids);
        uint256 actualBalance = erc721Pool.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + ids.length * 10**18;
        assertEq(actualBalance, expectedBalance, "mint pool tokens to caller");
    }

    /// @dev peripheralERC721Pool should not hold any NFTs or pool tokens after the bulkDeposit operation.
    function testFuzz_BulkDeposit_ZeroResidualAssetsInPeripheralERC721Pool(uint256[] memory ids) external {
        setUpBulkDeposit(ids);
        peripheralERC721Pool.bulkDeposit(erc721Pool, ids);
        uint256 erc721PoolTokenBalance = erc721Pool.balanceOf(address(peripheralERC721Pool));
        uint256 erc721AssetBalance = nft.balanceOf(address(peripheralERC721Pool));
        assertEq(erc721PoolTokenBalance, 0, "peripheralERC721Pool should not hold any pooltoken");
        assertEq(erc721AssetBalance, 0, "peripheralERC721Pool should not hold any nft");
    }

    /// @dev it should emit BulkDeposit event.
    function testFuzz_BulkDeposit_Event(uint256[] memory ids) external {
        setUpBulkDeposit(ids);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        emit BulkDeposit(address(erc721Pool), ids, users.alice);
        peripheralERC721Pool.bulkDeposit(erc721Pool, ids);
    }
}
