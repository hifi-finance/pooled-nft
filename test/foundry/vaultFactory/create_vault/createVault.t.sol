// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IVaultFactory } from "contracts/IVaultFactory.sol";
import { VaultFactoryTest } from "../VaultFactory.t.sol";

contract CreateVault_Test is VaultFactoryTest {
    modifier vaultAlreadyExists() {
        vaultFactory.createVault("JPEG Vault", "vJPEG", address(nft));
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_VaultAlreadyExists() external vaultAlreadyExists {
        vm.expectRevert(IVaultFactory.Vault__VaultAlreadyExists.selector);
        vaultFactory.createVault("JPEG Vault", "vJPEG", address(nft));
    }

    /// @dev it should create vault.
    function testFuzz_CreateVault(address asset) external {
        vaultFactory.createVault("JPEG Vault", "vJPEG", asset);
        assertTrue(vaultFactory.vaults(asset), "create vault");
    }

    /// @dev it should emit an CreateVault event.
    function testFuzz_CreateVault_Event(address asset) external {
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        // we are not checking topic 2
        // Checking topic 3 here doesn't matter, because `CreateVault` only has 2 indexed topics.
        emit CreateVault("JPEG Vault", "vJPEG", asset, address(0x0));
        vaultFactory.createVault("JPEG Vault", "vJPEG", asset);
    }
}
