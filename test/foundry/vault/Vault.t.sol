// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;
import "forge-std/console2.sol";
import { Vault } from "contracts/vault.sol";

import { BaseTest } from "../BaseTest.t.sol";

/// @title VaultTest
/// @author Hifi
/// @notice Common contract members needed across Vault test contracts.
abstract contract VaultTest is BaseTest {
    Vault public vault;

    /// EVENTS ///
    event Deposit(uint256[] inIds, uint256 outAmount, address indexed to);
    event Withdraw(uint256 inAmount, uint256[] outIds, address indexed to);

    /// SETUP FUNCTION ///
    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        BaseTest.setUp();
        vault = new Vault("JPEG Vault", "vJPEG", address(nft));
        // Make Alice the default caller in all subsequent tests.
        changePrank(users.alice);
    }

    /// HELPERS ///
    function mintNft(address beneficiary, uint256[] memory tokenIds) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nft.__godMode_mint(beneficiary, tokenIds[i]);
        }
    }

    function mintVaultTokens(address beneficiary, uint256[] memory tokenIds) internal {
        mintNft(beneficiary, tokenIds);
        uint256 outAmount = tokenIds.length * 10**18;
        changePrank(beneficiary);
        nft.setApprovalForAll(address(vault), true);
        vault.deposit(tokenIds, outAmount, beneficiary);
    }

    /// @dev Checks common assumptions for the test.
    function checkAssumptions(address beneficiary, uint256[] memory inIds) internal pure {
        vm.assume(beneficiary != address(0));
        vm.assume(inIds.length != 0);
        for (uint256 i = 0; i < inIds.length; i++) {
            for (uint256 j = i + 1; j < inIds.length; j++) {
                vm.assume(inIds[i] != inIds[j]);
            }
        }
    }
}
