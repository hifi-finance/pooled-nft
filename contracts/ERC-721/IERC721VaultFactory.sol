// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IERC721VaultFactory
/// @author Hifi
interface IERC721VaultFactory {
    /// CUSTOM ERRORS ///

    error ERC721VaultFactory__DoesNotImplementIERC721Metadata();
    error ERC721VaultFactory__VaultAlreadyExists();

    /// EVENTS ///

    /// @notice Emitted when a new vault is created.
    /// @param name The ERC-20 name of the vault.
    /// @param symbol The ERC-20 symbol of the vault.
    /// @param asset The underlying ERC-721 asset contract address.
    /// @param vault The created vault contract address.
    event CreateVault(string name, string symbol, address indexed asset, address indexed vault);

    /// CONSTANT FUNCTIONS ///

    /// @notice Returns the vault of the given asset token.
    /// @param asset The underlying ERC-721 asset contract address.
    function getVault(address asset) external view returns (address vault);

    /// @notice Returns the list of all vaults.
    function allVaults(uint256) external view returns (address vault);

    /// @notice Returns the length of the vaults list.
    function allVaultsLength() external view returns (uint256);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Create a new vault.
    ///
    /// @dev Emits a {CreateVault} event.
    ///
    /// @dev Requirements:
    /// - Can only create one vault per asset.
    ///
    /// @param asset The underlying ERC-721 asset contract address.
    function createVault(address asset) external;
}
