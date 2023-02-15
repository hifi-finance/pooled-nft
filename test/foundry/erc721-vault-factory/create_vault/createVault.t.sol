// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import { IERC721VaultFactory } from "contracts/ERC-721/IERC721VaultFactory.sol";
import { ERC721VaultFactory_Test } from "../ERC721VaultFactory.t.sol";

contract CreateVault_Test is ERC721VaultFactory_Test {
    /// @dev it should revert.
    function test_RevertWhen_DoesNotImplementIERC721Metadata() external {
        vm.expectRevert(IERC721VaultFactory.ERC721VaultFactory__DoesNotImplementIERC721Metadata.selector);
        erc721VaultFactory.createVault(address(randomNft));
    }

    modifier vaultAlreadyExists() {
        erc721VaultFactory.createVault(address(nft));
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_VaultAlreadyExists() external vaultAlreadyExists {
        vm.expectRevert(IERC721VaultFactory.ERC721VaultFactory__VaultAlreadyExists.selector);
        erc721VaultFactory.createVault(address(nft));
    }

    /// @dev it should create vault.
    function test_CreateVault() external {
        erc721VaultFactory.createVault(address(nft));
        assertTrue(erc721VaultFactory.getVault(address(nft)) != address(0), "create vault");
    }

    /// @dev it should emit an CreateVault event.
    function test_CreateVault_Event() external {
        string memory name = string.concat(IERC721Metadata(address(nft)).name(), " Vault");
        string memory symbol = string.concat(IERC721Metadata(address(nft)).symbol(), "v");
        bytes32 salt = keccak256(abi.encodePacked(address(nft)));
        bytes memory bytecode = vm.getCode("out/ERC721Vault.sol/ERC721Vault.json");
        bytes32 hash = keccak256(
            abi.encodePacked(bytes1(0xff), address(erc721VaultFactory), salt, keccak256(bytecode))
        );
        address vault = address(uint160(uint256(hash)));

        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit CreateVault(name, symbol, address(nft), address(vault));
        erc721VaultFactory.createVault(address(nft));
    }
}
