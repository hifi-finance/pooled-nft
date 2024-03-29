// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { Base_Test } from "test/foundry/Base.t.sol";
import { GodModeERC721Pool } from "contracts/test/ERC-721/GodModeERC721Pool.sol";
import { ReverseRegistrar } from "test/foundry/mocks/ReverseRegistrar.sol";

/// @title ERC721Pool_Test
/// @author Hifi
/// @notice Common contract members needed across Pool test contracts.
abstract contract ERC721Pool_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event Deposit(uint256 id, address beneficiary, address caller);
    event ReverseClaimed(address indexed addr, bytes32 indexed node);
    event RescueLastNFT(uint256 lastNFT, address to);
    event Withdraw(uint256 id, address beneficiary, address caller);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    GodModeERC721Pool internal erc721Pool = new GodModeERC721Pool("JPEG Pool", "JPEGp", address(nft));
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

    /*//////////////////////////////////////////////////////////////////////////
                                   HELPERS
    //////////////////////////////////////////////////////////////////////////*/

    function mintNft(address beneficiary, uint256[] memory tokenIds) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nft.__godMode_mint(beneficiary, tokenIds[i]);
        }
    }
}
