// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IERC1155Vault
/// @author Hifi
interface IERC1155Vault {
    /// CUSTOM ERRORS ///

    error ERC1155Vault__InOutMismatch();
    error ERC1155Vault__InsufficientIn();
    error ERC1155Vault__InvalidTo();

    /// EVENTS ///

    /// @notice Emitted when asset tokens are deposited to the vault in exchange for minted vault tokens.
    /// @param inAmount The amount of asset tokens sent from the user's account to the vault.
    /// @param outAmount The amount of vault tokens minted by the vault.
    /// @param to The account that received the minted vault tokens.
    event Deposit(uint256 inAmount, uint256 outAmount, address indexed to);

    /// @notice Emitted when asset tokens are withdrawn from the vault in exchange for burned vault tokens.
    /// @param inAmount The amount of vault tokens sent from the user's account to the vault.
    /// @param outAmount The asset tokens released from the vault.
    /// @param to The account that received the released asset tokens.
    event Withdraw(uint256 inAmount, uint256 outAmount, address indexed to);

    /// CONSTANT FUNCTIONS ///

    /// @notice Returns the total amount of asset tokens held for account.
    /// @param account The account to check.
    function holdingsFor(address account) external view returns (uint256);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Deposit asset tokens and mint an equivalent amount of vault tokens.
    ///
    /// @dev Emits a {Deposit} event.
    ///
    /// @dev Requirements:
    ///
    /// - The value of `inAmount` must be greater than zero.
    /// - The value of `inAmount` scaled to 18 decimals must match the value of `outAmount`.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inAmount The amount of asset tokens sent from the user's account to the vault.
    /// @param outAmount The amount of vault tokens to be minted by the vault.
    /// @param to The account that receives the minted vault tokens.
    function deposit(
        uint256 inAmount,
        uint256 outAmount,
        address to
    ) external;

    /// @notice Withdraw asset tokens and burn an equivalent amount of vault tokens.
    ///
    /// @dev Emits a {Withdraw} event.
    ///
    /// @dev Requirements:
    ///
    /// - The value of `inAmount` must be greater than zero.
    /// - The value of `inAmount` must match the length of `outAmount` scaled to 18 decimals.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inAmount The amount of vault tokens sent from the user's account to the vault.
    /// @param outAmount The amount of asset tokens to be released from the vault.
    /// @param to The account that receives the released asset tokens.
    function withdraw(
        uint256 inAmount,
        uint256 outAmount,
        address to
    ) external;
}
