// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IPeripheralERC721Pool.sol";
import "./IERC721Pool.sol";

/// @title PeripheralERC721Pool
/// @author Hifi
contract PeripheralERC721Pool is IPeripheralERC721Pool {
    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    function bulkDeposit(IERC721Pool pool, uint256[] calldata ids) external override {
        // Checks: ids length must be greater than zero
        if (ids.length == 0) {
            revert PeripheralERC721Pool__InsufficientIn();
        }

        // `msg.sender` is the owner of the NFTs who will receive the pool tokens.
        address sender = msg.sender;
        IERC721 erc721Asset = IERC721(pool.asset());

        // Checks: The caller must have allowed this contract to transfer the NFTs.
        if (!erc721Asset.isApprovedForAll(sender, address(this))) revert PeripheralERC721Pool__UnapprovedOperator();

        // Effects: Approve the pool to transfer the NFTs.
        if (!erc721Asset.isApprovedForAll(address(this), address(pool)))
            erc721Asset.setApprovalForAll(address(pool), true);

        for (uint256 i = 0; i < ids.length; ) {
            // Interactions: Transfer the NFTs from caller to this contract.
            erc721Asset.transferFrom(sender, address(this), ids[i]);

            // Effects: transfer NFTs from this contract to the pool and mint pool tokens to msg.sender.
            pool.deposit(ids[i], msg.sender);
            unchecked {
                ++i;
            }
        }

        emit BulkDeposit(address(pool), ids, sender);
    }

    function bulkWithdraw(IERC721Pool pool, uint256[] calldata ids) public override {
        // Checks: ids length must be greater than zero
        if (ids.length == 0) {
            revert PeripheralERC721Pool__InsufficientIn();
        }

        // `msg.sender` is the owner of the pool tokens who will receive the NFTs.
        address sender = msg.sender;

        // Interactions: Transfer the pool token from caller to this contract.
        pool.transferFrom(sender, address(this), ids.length * 10**18);

        for (uint256 i = 0; i < ids.length; ) {
            // Effects: transfer NFTs from the pool to msg.sender in exchange for pool tokens.
            pool.withdraw(ids[i], sender);
            unchecked {
                ++i;
            }
        }
        emit BulkWithdraw(address(pool), ids, sender);
    }

    function withdrawAvailable(IERC721Pool pool, uint256[] calldata ids) external override {
        // Checks: ids length must be greater than zero
        if (ids.length == 0) {
            revert PeripheralERC721Pool__InsufficientIn();
        }

        // `msg.sender` is the owner of the pool tokens who will receive the NFTs.
        address sender = msg.sender;

        // Interactions: Transfer the pool token from caller to this contract.
        pool.transferFrom(sender, address(this), ids.length * 10**18);

        uint256[] memory withdrawnIds = new uint256[](ids.length);
        uint256 withdrawnCount;
        for (uint256 i; i < ids.length; ) {
            // Effects: transfer available NFTs from the pool to msg.sender in exchange for pool tokens
            if (pool.holdingContains(ids[i])) {
                pool.withdraw(ids[i], sender);
                withdrawnIds[withdrawnCount] = ids[i];
                withdrawnCount++;
            }
            unchecked {
                ++i;
            }
        }

        if (withdrawnCount == 0) {
            revert PeripheralERC721Pool__NoNFTsWithdrawn();
        }

        // Resize the withdrawnIds array to fit the actual number of withdrawn NFTs
        assembly {
            mstore(withdrawnIds, withdrawnCount)
        }
        pool.transferFrom(address(this), sender, (ids.length - withdrawnCount) * 10**18);
        emit WithdrawAvailable(withdrawnIds, sender);
    }
}
