// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { ERC721VaultFactory } from "contracts/ERC-721/ERC721VaultFactory.sol";

import { Base_Test } from "../Base.t.sol";

/// @title ERC721VaultFactory_Test
/// @author Hifi
/// @notice Common contract members needed across ERC721VaultFactory test contracts.
abstract contract ERC721VaultFactory_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event CreateVault(string name, string symbol, address indexed asset, address indexed vault);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    ERC721VaultFactory internal erc721VaultFactory = new ERC721VaultFactory();

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        Base_Test.setUp();

        // Make Alice the default caller in all subsequent tests.
        changePrank(users.alice);
    }
}
