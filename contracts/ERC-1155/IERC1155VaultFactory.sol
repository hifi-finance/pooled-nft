// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IERC1155VaultFactory
/// @author Hifi
interface IERC1155VaultFactory {
    /// CUSTOM ERRORS ///

    error ERC1155VaultFactory__DoesNotImplementIERC1155();
    error ERC1155VaultFactory__VaultAlreadyExists();

    /// EVENTS ///

    /// @notice Emitted when a new vault is created.
    /// @param asset The underlying ERC-1155 asset contract address.
    /// @param assetId The underlying ERC-1155 asset token ID.
    /// @param vault The created vault contract address.
    event CreateVault(address indexed asset, uint256 indexed assetId, address indexed vault);

    /// CONSTANT FUNCTIONS ///

    /// @notice Returns the vault of the given asset token.
    /// @param asset The underlying ERC-1155 asset contract address.
    /// @param assetId The underlying ERC-1155 asset token ID.
    function getVault(address asset, uint256 assetId) external view returns (address vault);

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
    /// @param asset The underlying ERC-1155 asset contract address.
    /// @param assetId The underlying ERC-1155 asset token ID.
    function createVault(address asset, uint256 assetId) external;
}
