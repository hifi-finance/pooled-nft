// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { Base_Test } from "../Base.t.sol";
import { ERC20Wnft } from "contracts/ERC-721/ERC20Wnft.sol";
import { GodModeERC20Wnft } from "contracts/test/ERC-721/GodModeERC20Wnft.sol";

/// @title ERC20Wnft_Test
/// @author Hifi
/// @notice Common contract members needed across ERC20Wnft test contracts.
abstract contract ERC20Wnft_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/
    event Approval(address indexed owner, address indexed spender, uint256 amount);
    event Initialize(string name, string symbol, address indexed asset);
    event Transfer(address indexed from, address indexed to, uint256 value);

    /*//////////////////////////////////////////////////////////////////////////
                                     CONSTANTS
    //////////////////////////////////////////////////////////////////////////*/

    uint256 internal constant ONE_MILLION_WNFT = 1_000_000e18;
    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    GodModeERC20Wnft internal erc20Wnft = new GodModeERC20Wnft("My Token", "MTK", address(nft));

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        Base_Test.setUp();

        erc20Wnft.__godMode_mint(users.admin, ONE_MILLION_WNFT);
        // Make Alice the default caller in all subsequent tests.
        changePrank(users.alice);
    }
}
