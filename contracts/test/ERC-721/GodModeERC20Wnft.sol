// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "../../ERC-721/ERC20Wnft.sol";

/// @title GodModeERC20Wnft
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeERC20Wnft is ERC20Wnft {
    /// CONSTRUCTOR ///

    constructor(
        string memory name_,
        string memory symbol_,
        address asset_
    ) ERC20Wnft() {
        initialize(name_, symbol_, asset_);
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    function __godMode_mint(address beneficiary, uint256 mintAmount) external {
        _mint(beneficiary, mintAmount);
    }
}
