// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import { IVaultFactory } from "contracts/IVaultFactory.sol";
import { VaultFactoryTest } from "../VaultFactory.t.sol";

contract CreateVault_Test is VaultFactoryTest {
    /// @dev it should revert.
    function test_RevertWhen_DoesNotImplementIERC721Metadata() external {
        vm.expectRevert(IVaultFactory.VaultFactory__DoesNotImplementIERC721Metadata.selector);
        vaultFactory.createVault(address(randomNft));
    }

    modifier vaultAlreadyExists() {
        vaultFactory.createVault(address(nft));
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_VaultAlreadyExists() external vaultAlreadyExists {
        vm.expectRevert(IVaultFactory.VaultFactory__VaultAlreadyExists.selector);
        vaultFactory.createVault(address(nft));
    }

    /// @dev it should create vault.
    function test_CreateVault() external {
        vaultFactory.createVault(address(nft));
        assertTrue(vaultFactory.getVault(address(nft)) != address(0), "create vault");
    }

    /// @dev it should emit an CreateVault event.
    function test_CreateVault_Event() external {
        string memory name = string.concat(IERC721Metadata(address(nft)).name(), " Vaulted");
        string memory symbol = string.concat(IERC721Metadata(address(nft)).symbol(), "v");
        bytes32 salt = keccak256(abi.encodePacked(address(nft)));
        bytes memory bytecode = vm.getCode("out/Vault.sol/Vault.json");
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(vaultFactory), salt, keccak256(bytecode)));
        address vault = address(uint160(uint256(hash)));

        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit CreateVault(name, symbol, address(nft), address(vault));
        vaultFactory.createVault(address(nft));
    }
}
