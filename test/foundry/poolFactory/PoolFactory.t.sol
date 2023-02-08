// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { BaseTest } from "../BaseTest.t.sol";
import { PoolFactory } from "contracts/PoolFactory.sol";

/// @title PoolFactoryTest
/// @author Hifi
/// @notice Common contract members needed across PoolFactory test contracts.
abstract contract PoolFactoryTest is BaseTest {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event CreatePool(string name, string symbol, address indexed asset, address indexed pool);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    PoolFactory internal poolFactory = new PoolFactory();

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        BaseTest.setUp();
        // Make Alice the default caller in all subsequent tests.
        changePrank(users.alice);
    }
}
