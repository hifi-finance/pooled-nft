// SPDX-License-Identifier: TODO
pragma solidity >=0.8.4;

/// @title IVaultFactory
/// @author Hifi
/// @notice Todo.
interface IVaultFactory {
    /// CUSTOM ERRORS ///

    /// EVENTS ///

    /// CONSTANT FUNCTIONS ///

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Todo.
    ///
    /// @dev Emits a {CreateVault} event.
    ///
    /// Requirements:
    ///
    /// - Todo.
    ///
    /// @param name Todo.
    /// @param symbol Todo.
    /// @param asset Todo.
    function createVault(
        string calldata name,
        string calldata symbol,
        address asset
    ) external;
}
