// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { Base_Test } from "test/foundry/Base.t.sol";
import { ERC721PoolFactory } from "contracts/ERC-721/ERC721PoolFactory.sol";
import { ReverseRegistrar } from "test/foundry/mocks/ReverseRegistrar.sol";

/// @title ERC721PoolFactory_Test
/// @author Hifi
/// @notice Common contract members needed across ERC721PoolFactory test contracts.
abstract contract ERC721PoolFactory_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event CreatePool(string name, string symbol, address indexed asset, address indexed pool);
    event ENSNameSet(address poolAddress, string name);
    event RescueLastNFT(address asset, address to);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    ERC721PoolFactory internal erc721PoolFactory = new ERC721PoolFactory();
    ReverseRegistrar internal reverseRegistrar = new ReverseRegistrar();

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
