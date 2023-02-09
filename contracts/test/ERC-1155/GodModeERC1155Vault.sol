// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "../../ERC-1155/ERC1155Vault.sol";

/// @title GodModeERC1155Vault
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeERC1155Vault is ERC1155Vault {
    /// CONSTRUCTOR ///

    constructor(address asset_, uint256 assetId_) ERC1155Vault() {
        initialize(asset_, assetId_);
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    function __godMode_mint(address beneficiary, uint256 mintAmount) external {
        _mint(beneficiary, mintAmount);
    }

    function __godMode_setHoldings(address account, uint256 newHoldings) external {
        holdings[account] = newHoldings;
    }
}
