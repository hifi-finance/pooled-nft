// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "../../ERC-1155/ERC1155Pool.sol";

/// @title GodModeERC1155Pool
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeERC1155Pool is ERC1155Pool {
    /// CONSTRUCTOR ///

    constructor(address asset_, uint256 assetId_) ERC1155Pool() {
        initialize(asset_, assetId_);
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    function __godMode_mint(address beneficiary, uint256 mintAmount) external {
        _mint(beneficiary, mintAmount);
    }

    function __godMode_setHoldings(uint256 newHoldings) external {
        holdings = newHoldings;
    }
}
