// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

/// @title IERC721Vault
/// @author Hifi
interface IERC721Vault {
    /// CUSTOM ERRORS ///

    error ERC721Vault__InOutMismatch();
    error ERC721Vault__InsufficientIn();
    error ERC721Vault__InvalidTo();

    /// EVENTS ///

    /// @notice Emitted when asset token IDs are deposited to the vault in exchange for minted vault tokens.
    /// @param inIds The asset token IDs sent from the user's account to the vault.
    /// @param outAmount The amount of vault tokens minted by the vault.
    /// @param to The account that received the minted vault tokens.
    event Deposit(uint256[] inIds, uint256 outAmount, address indexed to);

    /// @notice Emitted when asset token IDs are withdrawn from the vault in exchange for burned vault tokens.
    /// @param inAmount The amount of vault tokens sent from the user's account to the vault.
    /// @param outIds The asset token IDs released from the vault.
    /// @param to The account that received the released asset token IDs.
    event Withdraw(uint256 inAmount, uint256[] outIds, address indexed to);

    /// CONSTANT FUNCTIONS ///

    /// @notice Returns the asset token ID held for account at index.
    /// @param account The account to check.
    /// @param index The index to check.
    function holdingAt(address account, uint256 index) external view returns (uint256);

    /// @notice Returns the total number of asset token IDs held for account.
    /// @param account The account to check.
    function holdingsLength(address account) external view returns (uint256);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Deposit asset token IDs and mint an equivalent amount of vault tokens.
    ///
    /// @dev Emits a {Deposit} event.
    ///
    /// @dev Requirements:
    ///
    /// - The length of `inIds` must be greater than zero.
    /// - The length of `inIds` scaled to 18 decimals must match the value of `outAmount`.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inIds The asset token IDs sent from the user's account to the vault.
    /// @param outAmount The amount of vault tokens to be minted by the vault.
    /// @param to The account that receives the minted vault tokens.
    function deposit(
        uint256[] calldata inIds,
        uint256 outAmount,
        address to
    ) external;

    /// @notice Withdraw asset token IDs and burn an equivalent amount of vault tokens.
    ///
    /// @dev Emits a {Withdraw} event.
    ///
    /// @dev Requirements:
    ///
    /// - The value of `inAmount` must be greater than zero.
    /// - The value of `inAmount` must match the length of `outIds` scaled to 18 decimals.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inAmount The amount of vault tokens sent from the user's account to the vault.
    /// @param outIds The asset token IDs to be released from the vault.
    /// @param to The account that receives the released asset token IDs.
    function withdraw(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to
    ) external;

    /// @notice Withdraw asset token IDs and burn an equivalent amount of vault tokens.
    ///
    /// @dev Emits a {Withdraw} event.
    ///
    /// @dev Requirements:
    ///
    /// - The `signature` must be a valid signed approval given by the caller to the ERC721Vault to spend `inAmount`
    ///  vault tokens for the given `deadline` and the caller's current nonce.
    /// - The value of `inAmount` must be greater than zero.
    /// - The value of `inAmount` must match the length of `outIds` scaled to 18 decimals.
    /// - The address `to` must not be the zero address.
    ///
    /// @param inAmount The amount of vault tokens sent from the user's account to the vault.
    /// @param outIds The asset token IDs to be released from the vault.
    /// @param to The account that receives the released asset token IDs.
    /// @param deadline The deadline beyond which the signature is not valid anymore.
    /// @param signature The packed signature for ERC721Vault.
    function withdrawWithSignature(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to,
        uint256 deadline,
        bytes memory signature
    ) external;
}
