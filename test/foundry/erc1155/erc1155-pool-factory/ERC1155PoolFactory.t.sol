// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { Base_Test } from "test/foundry/Base.t.sol";
import { ERC1155PoolFactory } from "contracts/ERC-1155/ERC1155PoolFactory.sol";

/// @title ERC1155PoolFactory_Test
/// @author Hifi
/// @notice Common contract members needed across ERC1155PoolFactory test contracts.
abstract contract ERC1155PoolFactory_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event CreatePool(address indexed asset, uint256 indexed assetId, address indexed pool);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    ERC1155PoolFactory internal erc1155PoolFactory = new ERC1155PoolFactory();

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
