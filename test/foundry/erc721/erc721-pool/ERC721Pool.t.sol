// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { Base_Test } from "test/foundry/Base.t.sol";
import { GodModeERC721Pool } from "contracts/test/ERC-721/GodModeERC721Pool.sol";
import { SigUtils } from "test/foundry/utils/SigUtils.sol";

/// @title ERC721Pool_Test
/// @author Hifi
/// @notice Common contract members needed across Pool test contracts.
abstract contract ERC721Pool_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event Deposit(uint256[] ids, address caller);
    event Withdraw(uint256[] ids, address caller);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    GodModeERC721Pool internal erc721Pool = new GodModeERC721Pool("JPEG Pool", "JPEGp", address(nft));
    SigUtils internal sigUtils = new SigUtils(erc721Pool.DOMAIN_SEPARATOR());

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
