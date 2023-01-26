// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IVaultFactory
/// @author Hifi
interface IVaultFactory {
    /// CUSTOM ERRORS ///

    error Vault__VaultAlreadyExists();

    /// EVENTS ///

    /// @notice Emitted when a new vault is created.
    /// @param name The ERC-20 name of the vault.
    /// @param symbol The ERC-20 symbol of the vault.
    /// @param asset The underlying ERC-721 asset contract address.
    /// @param vault The created vault contract address.
    event CreateVault(string name, string symbol, address indexed asset, address indexed vault);

    /// CONSTANT FUNCTIONS ///

    /// @notice Cheacks if the vault already exists or not.
    ///
    /// @param asset The underlying ERC-721 asset contract address.
    /// @return bool true = vault exists, otherwise not.
    function vaults(address asset) external view returns (bool);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Create a new vault.
    ///
    /// @dev Emits a {CreateVault} event.
    ///
    /// @param name The ERC-20 name of the vault.
    /// @param symbol The ERC-20 symbol of the vault.
    /// @param asset The underlying ERC-721 asset contract address.
    function createVault(
        string calldata name,
        string calldata symbol,
        address asset
    ) external;
}
