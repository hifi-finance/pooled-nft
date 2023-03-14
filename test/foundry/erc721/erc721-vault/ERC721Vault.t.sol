// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { Base_Test } from "test/foundry/Base.t.sol";
import { GodModeERC721Vault } from "contracts/test/ERC-721/GodModeERC721Vault.sol";
import { SigUtils } from "test/foundry/utils/SigUtils.sol";

/// @title ERC721Vault_Test
/// @author Hifi
/// @notice Common contract members needed across Vault test contracts.
abstract contract ERC721Vault_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event Deposit(uint256[] inIds, uint256 outAmount, address indexed to);
    event Withdraw(uint256 inAmount, uint256[] outIds, address indexed to);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    GodModeERC721Vault internal erc721Vault = new GodModeERC721Vault("JPEG Vault", "JPEGv", address(nft));
    SigUtils internal sigUtils = new SigUtils(erc721Vault.DOMAIN_SEPARATOR());

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
