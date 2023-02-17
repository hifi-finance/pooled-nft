// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { ERC1155VaultFactory } from "contracts/ERC-1155/ERC1155VaultFactory.sol";

import { Base_Test } from "test/foundry/Base.t.sol";

/// @title ERC1155VaultFactory_Test
/// @author Hifi
/// @notice Common contract members needed across ERC1155VaultFactory test contracts.
abstract contract ERC1155VaultFactory_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event CreateVault(address indexed asset, uint256 indexed assetId, address indexed vault);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    ERC1155VaultFactory internal erc1155VaultFactory = new ERC1155VaultFactory();

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
