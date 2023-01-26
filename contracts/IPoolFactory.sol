// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IPoolFactory
/// @author Hifi
interface IPoolFactory {
    /// CUSTOM ERRORS ///

    error PoolFactory__PoolAlreadyExists();

    /// EVENTS ///

    /// @notice Emitted when a new pool is created.
    /// @param name The ERC-20 name of the pool.
    /// @param symbol The ERC-20 symbol of the pool.
    /// @param asset The underlying ERC-721 asset contract address.
    /// @param pool The created pool contract address.
    event CreatePool(string name, string symbol, address indexed asset, address indexed pool);

    /// CONSTANT FUNCTIONS ///

    /// @notice Cheacks if the pool already exists or not.
    ///
    /// @param asset The underlying ERC-721 asset contract address.
    /// @return bool true = pool exists, otherwise not.
    function pools(address asset) external view returns (bool);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Create a new pool.
    ///
    /// @dev Emits a {CreatePool} event.
    ///
    /// @param name The ERC-20 name of the pool.
    /// @param symbol The ERC-20 symbol of the pool.
    /// @param asset The underlying ERC-721 asset contract address.
    function createPool(
        string calldata name,
        string calldata symbol,
        address asset
    ) external;
}
