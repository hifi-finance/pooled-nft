// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IPool
/// @author Hifi
interface IPool {
    /// CUSTOM ERRORS ///

    error Pool__InOutMismatch();
    error Pool__InsufficientIn();
    error Pool__InvalidTo();

    /// EVENTS ///

    /// @notice Emitted when pool tokens are minted in exchange for an equivalent amount of asset token IDs.
    /// @param inIds The asset token IDs sent from the user's account to the pool.
    /// @param outAmount The amount of pool tokens minted by the pool.
    /// @param to The account that received the minted pool tokens.
    event Mint(uint256[] inIds, uint256 outAmount, address indexed to);

    /// @notice Emitted when an amount of pool tokens are redeemed in exchange for an equivalent amount of asset token IDs.
    /// @param inAmount The amount of pool tokens sent from the user's account to the pool.
    /// @param outIds The asset token IDs released from the pool.
    /// @param to The account that received the released asset token IDs.
    event Redeem(uint256 inAmount, uint256[] outIds, address indexed to);

    /// @notice Emitted when an amount of asset token IDs are swapped in exchange for an equivalent amount of asset token IDs.
    /// @param inIds The asset token IDs sent from the user's account to the pool.
    /// @param outIds The asset token IDs released from the pool.
    /// @param to The account that received the released asset token IDs.
    event Swap(uint256[] inIds, uint256[] outIds, address indexed to);

    /// CONSTANT FUNCTIONS ///

    /// @notice The address of the underlying ERC-721 asset.
    function asset() external view returns (address);

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
    /// Requirements:
    ///
    /// - The length of `inIds` must be greater than zero.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inIds The asset token IDs sent from the user's account to the pool.
    /// @param outAmount The amount of pool tokens to be minted by the pool.
    /// @param to The account that receives the minted pool tokens.
    function mint(
        uint256[] calldata inIds,
        uint256 outAmount,
        address to
    ) external;

    /// @notice Redeem an amount of pool tokens in exchange for an equivalent amount of asset token IDs.
    ///
    /// @dev Emits a {Redeem} event.
    ///
    /// Requirements:
    ///
    /// - The value of `inAmount` must be greater than zero.
    /// - The value of `inAmount` must match the length of `outIds` scaled to 18 decimals.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inAmount The amount of pool tokens sent from the user's account to the pool.
    /// @param outIds The asset token IDs to be released from the pool.
    /// @param to The account that receives the released asset token IDs.
    function redeem(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to
    ) external;

    /// @notice Swap asset token IDs in user's account in exchange for asset token IDs in the pool.
    ///
    /// @dev Emits a {Swap} event.
    ///
    /// Requirements:
    ///
    /// - The length of `inIds` must be greater than zero.
    /// - The length of `inIds` must match the length of `outIds`.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inIds The asset token IDs sent from the user's account to the pool.
    /// @param outIds The asset token IDs to be released from the pool.
    /// @param to The account that receives the released asset token IDs.
    function swap(
        uint256[] calldata inIds,
        uint256[] calldata outIds,
        address to
    ) external;
}
