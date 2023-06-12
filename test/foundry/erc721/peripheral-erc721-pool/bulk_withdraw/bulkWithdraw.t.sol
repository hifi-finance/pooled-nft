// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IPeripheralERC721Pool } from "contracts/ERC-721/IPeripheralERC721Pool.sol";
import { PeripheralERC721Pool_Test } from "../PeripheralERC721Pool.t.sol";

contract BulkWithdraw_Test is PeripheralERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_IdsIsEmpty() external {
        uint256[] memory ids;
        vm.expectRevert(IPeripheralERC721Pool.PeripheralERC721Pool__InsufficientIn.selector);
        peripheralERC721Pool.bulkWithdraw(erc721Pool, ids);
    }

    /// @dev it should revert.
    function test_RevertWhen_AllowanceNotEnough(uint256[] memory ids) external {
        vm.assume(ids.length > 0);
        // For this test do not approve PeripheralERC721Pool to transfer pool token from the caller.
        vm.expectRevert(IPeripheralERC721Pool.PeripheralERC721Pool__UnapprovedOperator.selector);
        peripheralERC721Pool.bulkWithdraw(erc721Pool, ids);
    }

    /// @dev It should revert.
    function test_RevertWhen_IdNotAvailableInPool() external {
        // Set up the test environment with the given number of available NFTs.

        // Mint NFTs to erc721Pool.
        uint256[] memory availableIds = new uint256[](5);
        for (uint256 i = 0; i < 5; i++) {
            availableIds[i] = i;
        }
        mintNft(address(erc721Pool), availableIds);

        // Mint erc721Pool tokens so that we have enough to withdraw.
        erc721Pool.__godMode_mint(users.alice, 5 * 10**18);
        erc721Pool.__godMode_setHoldings(availableIds);

        // Request 3 NFTs out which last one is not available.
        uint256[] memory ids = new uint256[](3);
        ids[0] = 1;
        ids[1] = 2;
        ids[2] = 12;

        erc721Pool.approve(address(peripheralERC721Pool), ids.length * 10**18);
        vm.expectRevert();
        peripheralERC721Pool.bulkWithdraw(erc721Pool, ids);
        uint256 erc721PoolTokenBalance = erc721Pool.balanceOf(users.alice);
        uint256 erc721AssetBalance = nft.balanceOf(address(erc721Pool));
        assertEq(erc721PoolTokenBalance, 5 * 10**18, "caller pool tokens balance should remain same");
        assertEq(erc721AssetBalance, 5, "pool nft balance should remain same");
    }

    /// @dev Common set up for bulkWithdraw
    function setUpBulkWithdraw(uint256[] memory ids) internal {
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
    }

    modifier whenSpenderAllowanceEnough(uint256[] memory ids) {
        erc721Pool.approve(address(peripheralERC721Pool), ids.length * 10**18);
        _;
    }

    /// @dev it should transfer ids.length * 10 ** 18 erc721Pool tokens from caller to pool.
    function testFuzz_BulkWithdraw_BurnPoolTokens(uint256[] memory ids) external whenSpenderAllowanceEnough(ids) {
        setUpBulkWithdraw(ids);
        uint256 previousBalance = erc721Pool.balanceOf(users.alice);
        peripheralERC721Pool.bulkWithdraw(erc721Pool, ids);
        uint256 actualBalance = erc721Pool.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance - ids.length * 10**18;
        assertEq(actualBalance, expectedBalance, "burn Pool tokens");
    }

    /// @dev it should transfer nft from the pool contract to msg.sender.
    function testFuzz_BulkWithdraw_TransferNFTsToCaller(uint256[] memory ids) external whenSpenderAllowanceEnough(ids) {
        setUpBulkWithdraw(ids);
        uint256 previousBalance = nft.balanceOf(users.alice);
        peripheralERC721Pool.bulkWithdraw(erc721Pool, ids);
        uint256 actualBalance = nft.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + ids.length;
        assertEq(actualBalance, expectedBalance, "transfer NFT from pool to caller");
    }

    /// @dev peripheralERC721Pool should not hold any NFTs or pool tokens after the bulkWithdraw operation.
    function testFuzz_BulkWithdraw_ZeroResidualPoolTokensInPeripheralERC721Pool(uint256[] memory ids)
        external
        whenSpenderAllowanceEnough(ids)
    {
        setUpBulkWithdraw(ids);
        peripheralERC721Pool.bulkWithdraw(erc721Pool, ids);
        uint256 erc721PoolTokenBalance = erc721Pool.balanceOf(address(peripheralERC721Pool));
        uint256 erc721AssetBalance = nft.balanceOf(address(peripheralERC721Pool));
        assertEq(erc721PoolTokenBalance, 0, "peripheralERC721Pool should not hold any pooltoken");
        assertEq(erc721AssetBalance, 0, "peripheralERC721Pool should not hold any nft");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Withdraw_RemoveAssetTokenIdsfromHoldings(uint256[] memory ids)
        external
        whenSpenderAllowanceEnough(ids)
    {
        setUpBulkWithdraw(ids);
        uint256 previousHoldingsLength = erc721Pool.holdingsLength();
        peripheralERC721Pool.bulkWithdraw(erc721Pool, ids);
        uint256 actualHoldingsLength = erc721Pool.holdingsLength();
        uint256 expectedHoldingsLength = previousHoldingsLength - ids.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should emit BulkWithdraw event.
    function testFuzz_BulkWithdraw_Event(uint256[] memory ids) external whenSpenderAllowanceEnough(ids) {
        setUpBulkWithdraw(ids);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        emit BulkWithdraw(address(erc721Pool), ids, users.alice);
        peripheralERC721Pool.bulkWithdraw(erc721Pool, ids);
    }
}
