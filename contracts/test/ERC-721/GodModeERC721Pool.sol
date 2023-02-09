// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "../../ERC-721/ERC721Pool.sol";

/// @title GodModeERC721Pool
/// @author Hifi
/// @dev Strictly for test purposes.
contract GodModeERC721Pool is ERC721Pool {
    using EnumerableSet for EnumerableSet.UintSet;

    /// CONSTRUCTOR ///

    constructor(
        string memory name_,
        string memory symbol_,
        address asset_
    ) ERC721Pool() {
        initialize(name_, symbol_, asset_);
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
