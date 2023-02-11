// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/Test.sol";
import { GodModeERC721 } from "../../contracts/test/GodModeERC721.sol";
import { RandomNFT } from "./Mocks/RandomNFT.sol";

/// @title BaseTest
/// @author Hifi
/// @notice Common contract members needed across test contracts.
abstract contract BaseTest is Test {
    /*//////////////////////////////////////////////////////////////////////////
                                      STRUCTS
    //////////////////////////////////////////////////////////////////////////*/

    struct Users {
        address alice;
        address admin;
        address bob;
    }

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/
    GodModeERC721 internal nft = new GodModeERC721("MOCK NFT", "MOCK");
    RandomNFT internal randomNft = new RandomNFT();
    Users internal users;

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual {
        // Create users for testing.
        users = Users({ alice: createUser("Alice"), admin: createUser("Admin"), bob: createUser("Bob") });

        // Make the admin the default caller in all subsequent tests.
        changePrank(users.admin);
    }

    /*//////////////////////////////////////////////////////////////////////////
                          INTERNAL NON-CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev Generates an address by hashing the name, labels the address and funds it with 100 ETH.
    function createUser(string memory name) internal returns (address addr) {
        (addr, ) = makeAddrAndKey(name);
        vm.deal({ account: addr, newBalance: 100 ether });
    }
}
