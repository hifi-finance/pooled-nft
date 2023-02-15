// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/// @title GodModeERC1155
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeERC1155 is ERC1155 {
    /// CONSTRUCTOR ///

    constructor(string memory name_, string memory symbol_) ERC1155("") {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @notice Destroys tokens from `holder`, reducing the token balance of the owner.
    /// @param holder The account from which to burn the tokens.
    /// @param tokenId The token ID to destroy.
    /// @param tokenAmount The amount of tokens to print into existence.
    function __godMode_burn(
        address holder,
        uint256 tokenId,
        uint256 tokenAmount
    ) external {
        _burn(holder, tokenId, tokenAmount);
    }

    /// @notice Prints new tokens into existence and assigns it to `beneficiary`, increasing the
    /// token balance of the owner.
    /// @param beneficiary The account for which to mint the tokens.
    /// @param tokenId The token ID to print into existence.
    /// @param tokenAmount The amount of tokens to print into existence.
    function __godMode_mint(
        address beneficiary,
        uint256 tokenId,
        uint256 tokenAmount
    ) external {
        _mint(beneficiary, tokenId, tokenAmount, "");
    }
}
