// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "../Vault.sol";

/// @title GodModeVault
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeVault is Vault {
    using EnumerableSet for EnumerableSet.UintSet;

    /// CONSTRUCTOR ///

    constructor(
        string memory name_,
        string memory symbol_,
        address asset_
    ) Vault(name_, symbol_, asset_) {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    function __godMode_mint(address beneficiary, uint256 mintAmount) external {
        _mint(beneficiary, mintAmount);
    }

    function __godMode_setHoldings(uint256[] calldata newHoldings) external {
        for (uint256 i; i < holdings.length(); i++) {
            holdings.remove(holdings.at(i));
        }
        for (uint256 i; i < newHoldings.length; i++) {
            holdings.add(newHoldings[i]);
        }
    }
}
