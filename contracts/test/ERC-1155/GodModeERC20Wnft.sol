// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "../../ERC-1155/ERC20Wnft.sol";

/// @title GodModeERC20Wnft
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeERC20Wnft is ERC20Wnft {
    /// CONSTRUCTOR ///

    constructor(address asset_, uint256 assetId_) ERC20Wnft() {
        initialize(asset_, assetId_);
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    function __godMode_mint(address beneficiary, uint256 mintAmount) external {
        _mint(beneficiary, mintAmount);
    }
}
