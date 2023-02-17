// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

//import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { IERC1155VaultFactory } from "contracts/ERC-1155/IERC1155VaultFactory.sol";
import { ERC1155VaultFactory_Test } from "../ERC1155VaultFactory.t.sol";

contract CreateVault_Test is ERC1155VaultFactory_Test {
    /// @dev it should revert.
    function test_RevertWhen_DoesNotImplementIERC1155Metadata() external {
        vm.expectRevert(IERC1155VaultFactory.ERC1155VaultFactory__DoesNotImplementIERC1155.selector);
        erc1155VaultFactory.createVault(address(randomNft), 123);
    }

    modifier vaultAlreadyExists() {
        erc1155VaultFactory.createVault(address(erc1155), 123);
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_VaultAlreadyExists() external vaultAlreadyExists {
        vm.expectRevert(IERC1155VaultFactory.ERC1155VaultFactory__VaultAlreadyExists.selector);
        erc1155VaultFactory.createVault(address(erc1155), 123);
    }

    /// @dev it should create vault.
    function test_CreateVault() external {
        erc1155VaultFactory.createVault(address(erc1155), 123);
        assertTrue(erc1155VaultFactory.getVault(address(erc1155), 123) != address(0), "create vault");
    }

    /// @dev it should emit an CreateVault event.
    function test_CreateVault_Event() external {
        bytes32 salt = keccak256(abi.encodePacked(address(erc1155)));
        bytes memory bytecode = vm.getCode("out/ERC1155Vault.sol/ERC1155Vault.json");
        bytes32 hash = keccak256(
            abi.encodePacked(bytes1(0xff), address(erc1155VaultFactory), salt, keccak256(bytecode))
        );
        address vault = address(uint160(uint256(hash)));

        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit CreateVault(address(erc1155), 123, address(vault));
        erc1155VaultFactory.createVault(address(erc1155), 123);
    }
}
