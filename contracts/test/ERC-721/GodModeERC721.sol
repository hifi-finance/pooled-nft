// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/// @title GodModeERC721
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeERC721 is ERC721Enumerable {
    /// CONSTRUCTOR ///

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @notice Destroys token with ID of `tokenId` from `holder`, reducing the token balance of the owner.
    /// @param tokenId The token ID to destroy.
    function __godMode_burn(uint256 tokenId) external {
        _burn(tokenId);
    }

    /// @notice Prints a new token ID into existence and assigns it to `beneficiary`, increasing the
    /// token balance of the owner.
    /// @param beneficiary The account for which to mint the token ID.
    /// @param tokenId The token ID to print into existence.
    function __godMode_mint(address beneficiary, uint256 tokenId) external {
        _mint(beneficiary, tokenId);
    }
}
