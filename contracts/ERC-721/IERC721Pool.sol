// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IERC721Pool
/// @author Hifi
interface IERC721Pool {
    /// CUSTOM ERRORS ///

    error ERC721Pool__InsufficientIn();
    error ERC721Pool__InvalidTo();

    /// EVENTS ///

    /// @notice Emitted when pool tokens are minted in exchange for an equivalent amount of asset token IDs.
    /// @param inIds The asset token IDs sent from the user's account to the pool.
    /// @param to The account that received the minted pool tokens.
    event Mint(uint256[] inIds, address indexed to);

    /// @notice Emitted when an amount of pool tokens are redeemed in exchange for an equivalent amount
    /// of asset token IDs.
    /// @param outIds The asset token IDs released from the pool.
    /// @param to The account that received the released asset token IDs.
    event Redeem(uint256[] outIds, address indexed to);

    /// CONSTANT FUNCTIONS ///

    /// @notice Returns the asset token ID held at index.
    /// @param index The index to check.
    function holdingAt(uint256 index) external view returns (uint256);

    /// @notice Returns the total number of asset token IDs held.
    function holdingsLength() external view returns (uint256);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Mint an amount of pool tokens in exchange for an equivalent amount of asset token IDs.
    ///
    /// @dev Emits a {Mint} event.
    ///
    /// @dev Requirements:
    ///
    /// - The length of `inIds` must be greater than zero.
    /// - The length of `inIds` scaled to 18 decimals must match the value of `outAmount`.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inIds The asset token IDs sent from the user's account to the pool.
    /// @param to The account that receives the minted pool tokens.
    function mint(uint256[] calldata inIds, address to) external;

    /// @notice Redeem an amount of pool tokens in exchange for an equivalent amount of asset token IDs.
    ///
    /// @dev Emits a {Redeem} event.
    ///
    /// @dev Requirements:
    ///
    /// - The value of `inAmount` must be greater than zero.
    /// - The value of `inAmount` must match the length of `outIds` scaled to 18 decimals.
    /// - The address `to` must not be the zero address.
    ///
    /// @param outIds The asset token IDs to be released from the pool.
    /// @param to The account that receives the released asset token IDs.
    function redeem(uint256[] calldata outIds, address to) external;

    /// @notice Redeem an amount of pool tokens in exchange for an equivalent amount of asset token IDs.
    ///
    /// @dev Emits a {Redeem} event.
    ///
    /// @dev Requirements:
    /// - The `signature` must be a valid signed approval given by the caller to the ERC721Pool to spend `inAmount`
    ///  pool tokens for the given `deadline` and the caller's current nonce.
    /// - The value of `inAmount` must be greater than zero.
    /// - The value of `inAmount` must match the length of `outIds` scaled to 18 decimals.
    /// - The address `to` must not be the zero address.
    ///
    /// @param outIds The asset token IDs to be released from the pool.
    /// @param to The account that receives the released asset token IDs.
    /// @param deadline The deadline beyond which the signature is not valid anymore.
    /// @param signature The packed signature for ERC721Pool.
    function redeemWithSignature(
        uint256[] calldata outIds,
        address to,
        uint256 deadline,
        bytes memory signature
    ) external;
}
