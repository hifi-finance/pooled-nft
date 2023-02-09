// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "../../ERC-721/ERC721Vault.sol";

/// @title GodModeERC721Vault
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeERC721Vault is ERC721Vault {
    using EnumerableSet for EnumerableSet.UintSet;

    /// CONSTRUCTOR ///

    constructor(
        string memory name_,
        string memory symbol_,
        address asset_
    ) ERC721Vault() {
        initialize(name_, symbol_, asset_);
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    function __godMode_mint(address beneficiary, uint256 mintAmount) external {
        _mint(beneficiary, mintAmount);
    }

    function __godMode_setHoldings(address account, uint256[] calldata newHoldings) external {
        for (uint256 i; i < holdings[account].length(); i++) {
            holdings[account].remove(holdings[account].at(i));
        }
        for (uint256 i; i < newHoldings.length; i++) {
            holdings[account].add(newHoldings[i]);
        }
    }
}
