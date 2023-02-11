// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { GodModeVault } from "contracts/test/GodModeVault.sol";
import { BaseTest } from "../BaseTest.t.sol";
import { SigUtils } from "../utils/SigUtils.sol";

/// @title VaultTest
/// @author Hifi
/// @notice Common contract members needed across Vault test contracts.
abstract contract VaultTest is BaseTest {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event Deposit(uint256[] inIds, uint256 outAmount, address indexed to);
    event Withdraw(uint256 inAmount, uint256[] outIds, address indexed to);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    GodModeVault internal vault = new GodModeVault("JPEG Vaulted", "JPEGv", address(nft));
    SigUtils internal sigUtils = new SigUtils(vault.DOMAIN_SEPARATOR());

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        BaseTest.setUp();
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
