// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IPeripheralERC721Pool } from "contracts/ERC-721/IPeripheralERC721Pool.sol";
import { PeripheralERC721Pool_Test } from "../PeripheralERC721Pool.t.sol";

contract WithdrawAvailable_Test is PeripheralERC721Pool_Test {
    /// @dev it should revert when `ids` is empty.
    function test_RevertWhen_IdsIsEmpty() external {
        uint256[] memory ids;
        vm.expectRevert(IPeripheralERC721Pool.PeripheralERC721Pool__InsufficientIn.selector);
        peripheralERC721Pool.withdrawAvailable(erc721Pool, ids);
    }

    /// @dev it should revert when the caller has not approved the transfer of pool tokens.
    function test_RevertWhen_AllowanceNotEnough(uint256[] memory ids) external {
        vm.assume(ids.length > 0);
        // For this test, do not approve PeripheralERC721Pool to transfer pool tokens from the caller.
        vm.expectRevert(IPeripheralERC721Pool.PeripheralERC721Pool__UnapprovedOperator.selector);
        peripheralERC721Pool.withdrawAvailable(erc721Pool, ids);
    }

    /// @dev it should revert when none of the requested NFTs are available in the pool.
    function test_RevertWhen_NoNFTsWithdrawn() external {
        // Set up the test environment with 5 available NFTs.

        // Mint erc721Pool tokens so that we have enough to withdraw.
        erc721Pool.__godMode_mint(users.alice, 5 * 10**18);

        // Request 3 NFTs that are not available.
        uint256[] memory ids = new uint256[](3);
        ids[0] = 10;
        ids[1] = 11;
        ids[2] = 12;

        erc721Pool.approve(address(peripheralERC721Pool), ids.length * 10**18);

        vm.expectRevert(IPeripheralERC721Pool.PeripheralERC721Pool__NoNFTsWithdrawn.selector);
        peripheralERC721Pool.withdrawAvailable(erc721Pool, ids);
    }

    /// @dev Common set up for withdrawAvailable.
    /// Request `withdrawCount` number of NFTs, out of which `availableCount` are available and rest are not available in pool.
    /// @param availableCount Number of NFTs available in pool.
    /// @param withdrawCount  Total number of NFTs requested.
    /// @return ids The array of NFT IDs.
    function setUpWithdrawAvailable(uint256 availableCount, uint256 withdrawCount)
        internal
        returns (uint256[] memory ids)
    {
        // Logic to generate ids array such that ids.length == withdrawCount and ids[0..availableCount-1] are available and ids[availableCount..withdrawCount-1] are not available

        // Mint `availableCount` NFTs to erc721Pool.
        ids = new uint256[](availableCount);
        for (uint256 i = 0; i < availableCount; i++) {
            ids[i] = i;
        }

        mintNft(address(erc721Pool), ids);

        // Mint `withdrawCount * 10**18` erc721Pool tokens so that we have enough to withdraw.
        erc721Pool.__godMode_mint(users.alice, withdrawCount * 10**18);
        erc721Pool.__godMode_setHoldings(ids);

        // ids[availableCount...withdrawCount-1] are not available
        assembly {
            mstore(ids, withdrawCount)
        }
        for (uint256 i = availableCount; i < withdrawCount; i++) {
            ids[i] = availableCount + i;
        }

        // approve PeripheralERC721Pool to transfer pool tokens from the caller.
        erc721Pool.approve(address(peripheralERC721Pool), withdrawCount * 10**18);

        return ids;
    }

    modifier whenSpenderAllowanceEnough(uint256 poolTokensAmount) {
        erc721Pool.approve(address(peripheralERC721Pool), poolTokensAmount);
        _;
    }

    /// @dev It should transfer equivalent amount of pool tokens from the caller to the pool contract in exchange for available NFTs.
    function testFuzz_WithdrawAvailable_TransferEquivalentPoolTokens(uint256 availableCount, uint256 withdrawCount)
        external
    {
        withdrawCount = bound(withdrawCount, 1, 10000);
        availableCount = bound(availableCount, 1, withdrawCount);

        uint256[] memory ids = setUpWithdrawAvailable(availableCount, withdrawCount);
        uint256 previousBalance = erc721Pool.balanceOf(users.alice);

        peripheralERC721Pool.withdrawAvailable(erc721Pool, ids);
        uint256 actualBalance = erc721Pool.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance - availableCount * 10**18;
        assertEq(actualBalance, expectedBalance, "burn pool tokens");
    }

    /// @dev It should transfer available NFTs from the pool contract to msg.sender.
    function testFuzz_WithdrawAvailable_TransferAvailableNFTsToCaller(uint256 availableCount, uint256 withdrawCount)
        external
    {
        withdrawCount = bound(withdrawCount, 1, 10000);
        availableCount = bound(availableCount, 1, withdrawCount);
        uint256[] memory ids = setUpWithdrawAvailable(availableCount, withdrawCount);

        uint256 previousBalance = nft.balanceOf(users.alice);
        peripheralERC721Pool.withdrawAvailable(erc721Pool, ids);
        uint256 actualBalance = nft.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + availableCount;
        assertEq(actualBalance, expectedBalance, "transfer available NFTs from pool to caller");
    }

    /// @dev peripheralERC721Pool should not hold any NFTs or pool tokens after the withdrawAvailable operation.
    function testFuzz_WithdrawAvailable_ZeroResidualPoolTokensInPeripheralERC721Pool(
        uint256 availableCount,
        uint256 withdrawCount
    ) external {
        withdrawCount = bound(withdrawCount, 1, 10000);
        availableCount = bound(availableCount, 1, withdrawCount);
        uint256[] memory ids = setUpWithdrawAvailable(availableCount, withdrawCount);

        peripheralERC721Pool.withdrawAvailable(erc721Pool, ids);
        uint256 erc721PoolTokenBalance = erc721Pool.balanceOf(address(peripheralERC721Pool));
        uint256 erc721AssetBalance = nft.balanceOf(address(peripheralERC721Pool));
        assertEq(erc721PoolTokenBalance, 0, "peripheralERC721Pool should not hold any pool token");
        assertEq(erc721AssetBalance, 0, "peripheralERC721Pool should not hold any NFT");
    }

    /// @dev It should emit a WithdrawAvailable event.
    function testFuzz_WithdrawAvailable_Event(uint256 availableCount, uint256 withdrawCount) external {
        withdrawCount = bound(withdrawCount, 1, 10000);
        availableCount = bound(availableCount, 1, withdrawCount);
        uint256[] memory ids = setUpWithdrawAvailable(availableCount, withdrawCount);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        uint256[] memory withdrawnIds = new uint256[](availableCount);
        for (uint256 i = 0; i < availableCount; i++) {
            withdrawnIds[i] = i;
        }

        emit WithdrawAvailable(address(erc721Pool), withdrawnIds, users.alice);
        peripheralERC721Pool.withdrawAvailable(erc721Pool, ids);
    }
}
