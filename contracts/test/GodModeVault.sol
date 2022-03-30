// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "../Vault.sol";

/// @title GodModeVault
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeVault is Vault {
    constructor(
        string memory name_,
        string memory symbol_,
        address asset_
    ) Vault(name_, symbol_, asset_) {
        // solhint-disable-previous-line no-empty-blocks
    }

    function __godMode_mint(address beneficiary, uint256 mintAmount) external {
        _mint(beneficiary, mintAmount);
    }
}
