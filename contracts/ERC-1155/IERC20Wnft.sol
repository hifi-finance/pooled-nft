// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

/// @title IERC20Wnft
/// @author Hifi
interface IERC20Wnft is IERC20Metadata {
    /// CUSTOM ERRORS ///

    error ERC20Wnft__Forbidden();
    error ERC20Wnft__PermitExpired();

    /// EVENTS ///

    /// @notice Emitted when the contract is initialized.
    /// @param asset The underlying ERC-1155 asset contract address.
    /// @param assetId The underlying ERC-1155 asset contract address.
    /// @param admin The admin contract address.
    event Initialize(address indexed asset, uint256 indexed assetId, address admin);

    /// @notice Emitted when the ERC-20 name and symbol are set.
    /// @param name The ERC-20 name that was set.
    /// @param symbol The ERC-20 symbol that was set.
    event SetNameSymbol(string name, string symbol);

    /// CONSTANT FUNCTIONS ///

    /// @notice Returns the address of the underlying ERC-1155 asset.
    function asset() external view returns (address);

    /// @notice Returns the token ID of the underlying ERC-1155 asset.
    function assetId() external view returns (uint256);

    /// @notice Returns the factory contract address.
    function factory() external view returns (address);

    /// @notice Returns the contract admin address.
    function admin() external view returns (address);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Initializes the contract with the given values.
    ///
    /// @dev Emits an {Initialize} event.
    ///
    /// @dev Requirements:
    /// - Can only be called by the factory.
    ///
    /// @param asset The underlying ERC-1155 asset contract address.
    /// @param assetId The underlying ERC-1155 asset token ID.
    /// @param admin The admin contract address.
    function initialize(
        address asset,
        uint256 assetId,
        address admin
    ) external;

    /// @notice Sets the ERC-20 token name and symbol.
    ///
    /// @dev Emits a {SetNameSymbol} event.
    ///
    /// @dev Requirements:
    /// - Can only be called by the admin.
    ///
    /// @param name The ERC-20 name to set.
    /// @param symbol The ERC-20 symbol to set.
    function setNameSymbol(string calldata name, string calldata symbol) external;
}
