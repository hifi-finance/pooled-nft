// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { IERC1155PoolFactory } from "contracts/ERC-1155/IERC1155PoolFactory.sol";
import { ERC1155PoolFactory_Test } from "../ERC1155PoolFactory.t.sol";

contract CreatePool_Test is ERC1155PoolFactory_Test {
    /// @dev it should revert.
    function test_RevertWhen_DoesNotImplementIERC1155Metadata() external {
        vm.expectRevert(IERC1155PoolFactory.ERC1155PoolFactory__DoesNotImplementIERC1155.selector);
        erc1155PoolFactory.createPool(address(randomNft), 123);
    }

    modifier poolAlreadyExists() {
        erc1155PoolFactory.createPool(address(erc1155), 123);
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_PoolAlreadyExists() external poolAlreadyExists {
        vm.expectRevert(IERC1155PoolFactory.ERC1155PoolFactory__PoolAlreadyExists.selector);
        erc1155PoolFactory.createPool(address(erc1155), 123);
    }

    /// @dev it should create pool.
    function test_CreatePool() external {
        erc1155PoolFactory.createPool(address(erc1155), 123);
        assertTrue(erc1155PoolFactory.getPool(address(erc1155), 123) != address(0), "get pool");
    }

    /// @dev it should emit CreatePool
    function test_CreatePool_Event() external {
        bytes32 salt = keccak256(abi.encodePacked(address(erc1155)));
        bytes memory bytecode = vm.getCode("out/ERC1155Pool.sol/ERC1155Pool.json");
        bytes32 hash = keccak256(
            abi.encodePacked(bytes1(0xff), address(erc1155PoolFactory), salt, keccak256(bytecode))
        );
        address pool = address(uint160(uint256(hash)));

        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit CreatePool(address(erc1155), 123, address(pool));
        erc1155PoolFactory.createPool(address(erc1155), 123);
    }
}
