// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { VaultFactory } from "contracts/VaultFactory.sol";

import { BaseTest } from "../BaseTest.t.sol";

/// @title VaultFactoryTest
/// @author Hifi
/// @notice Common contract members needed across VaultFactory test contracts.
abstract contract VaultFactoryTest is BaseTest {
    VaultFactory public vaultFactory;

    /// EVENTS ///
    event CreateVault(string name, string symbol, address indexed asset, address indexed vault);

    /// SETUP FUNCTION ///
    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        BaseTest.setUp();
        vaultFactory = new VaultFactory();
        // Make Alice the default caller in all subsequent tests.
        changePrank(users.alice);
    }
}
