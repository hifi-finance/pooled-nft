// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { BaseTest } from "../BaseTest.t.sol";
import { ERC20Wnft } from "contracts/ERC20Wnft.sol";
import { GodModeERC20Wnft } from "contracts/test/GodModeERC20Wnft.sol";

/// @title ERC20WnftTest
/// @author Hifi
/// @notice Common contract members needed across ERC20Wnft test contracts.
abstract contract ERC20WnftTest is BaseTest {
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

    //ERC20Wnft internal erc20Wnft = new ERC20Wnft();
    GodModeERC20Wnft internal erc20Wnft = new GodModeERC20Wnft("My Token", "MTK", address(nft));

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        BaseTest.setUp();

        erc20Wnft.__godMode_mint(users.admin, ONE_MILLION_WNFT);
        // Make Alice the default caller in all subsequent tests.
        changePrank(users.alice);
    }
}
