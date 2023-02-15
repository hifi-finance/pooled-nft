// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IERC1155Pool
/// @author Hifi
interface IERC1155Pool {
    /// CUSTOM ERRORS ///

    error ERC1155Pool__InOutMismatch();
    error ERC1155Pool__InsufficientIn();
    error ERC1155Pool__InvalidTo();

    /// EVENTS ///

    /// @notice Emitted when pool tokens are minted in exchange for an equivalent amount of asset tokens.
    /// @param inAmount The amount of asset tokens sent from the user's account to the pool.
    /// @param outAmount The amount of pool tokens minted by the pool.
    /// @param to The account that received the minted pool tokens.
    event Mint(uint256 inAmount, uint256 outAmount, address indexed to);

    /// @notice Emitted when an amount of pool tokens are redeemed in exchange for an equivalent amount
    /// of asset tokens.
    /// @param inAmount The amount of pool tokens sent from the user's account to the pool.
    /// @param outAmount The amount of asset tokens released from the pool.
    /// @param to The account that received the released asset tokens.
    event Redeem(uint256 inAmount, uint256 outAmount, address indexed to);

    /// CONSTANT FUNCTIONS ///

    /// @notice Returns the total amount of asset tokens held.
    function holdings() external view returns (uint256);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Mint an amount of pool tokens in exchange for an equivalent amount of asset tokens.
    ///
    /// @dev Emits a {Mint} event.
    ///
    /// @dev Requirements:
    ///
    /// - `inAmount` must be greater than zero.
    /// - `inAmount` scaled to 18 decimals must match the value of `outAmount`.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inAmount The amount of asset tokens sent from the user's account to the pool.
    /// @param outAmount The amount of pool tokens to be minted by the pool.
    /// @param to The account that receives the minted pool tokens.
    function mint(
        uint256 inAmount,
        uint256 outAmount,
        address to
    ) external;

    /// @notice Redeem an amount of pool tokens in exchange for an equivalent amount of asset tokens.
    ///
    /// @dev Emits a {Redeem} event.
    ///
    /// @dev Requirements:
    ///
    /// - The value of `inAmount` must be greater than zero.
    /// - The value of `inAmount` must match the length of `outIds` scaled to 18 decimals.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inAmount The amount of pool tokens sent from the user's account to the pool.
    /// @param outAmount The asset tokens to be released from the pool.
    /// @param to The account that receives the released asset token IDs.
    function redeem(
        uint256 inAmount,
        uint256 outAmount,
        address to
    ) external;
}
