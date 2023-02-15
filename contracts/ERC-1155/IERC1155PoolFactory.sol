// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IERC1155PoolFactory
/// @author Hifi
interface IERC1155PoolFactory {
    /// CUSTOM ERRORS ///

    error ERC1155PoolFactory__DoesNotImplementIERC1155();
    error ERC1155PoolFactory__PoolAlreadyExists();

    /// EVENTS ///

    /// @notice Emitted when a new pool is created.
    /// @param asset The underlying ERC-1155 asset contract address.
    /// @param assetId The underlying ERC-1155 asset token ID.
    /// @param pool The created pool contract address.
    event CreatePool(address indexed asset, uint256 indexed assetId, address indexed pool);

    /// CONSTANT FUNCTIONS ///

    /// @notice Returns the pool of the given asset token.
    /// @param asset The underlying ERC-1155 asset contract address.
    /// @param assetId The underlying ERC-1155 asset token ID.
    function getPool(address asset, uint256 assetId) external view returns (address pool);

    /// @notice Returns the list of all pools.
    function allPools(uint256) external view returns (address pool);

    /// @notice Returns the length of the pools list.
    function allPoolsLength() external view returns (uint256);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Create a new pool.
    ///
    /// @dev Emits a {CreatePool} event.
    ///
    /// @dev Requirements:
    /// - Can only create one pool per asset.
    ///
    /// @param asset The underlying ERC-1155 asset contract address.
    /// @param assetId The underlying ERC-1155 asset token ID.
    function createPool(address asset, uint256 assetId) external;
}
