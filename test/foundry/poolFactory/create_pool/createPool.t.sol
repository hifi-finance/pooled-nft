// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import { IPoolFactory } from "contracts/IPoolFactory.sol";
import { PoolFactoryTest } from "../PoolFactory.t.sol";

contract CreatePool_Test is PoolFactoryTest {
    /// @dev it should revert.
    function test_RevertWhen_DoesNotImplementIERC721Metadata() external {
        vm.expectRevert(IPoolFactory.PoolFactory__DoesNotImplementIERC721Metadata.selector);
        poolFactory.createPool(address(randomNft));
    }

    modifier poolAlreadyExists() {
        poolFactory.createPool(address(nft));
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_PoolAlreadyExists() external poolAlreadyExists {
        vm.expectRevert(IPoolFactory.PoolFactory__PoolAlreadyExists.selector);
        poolFactory.createPool(address(nft));
    }

    /// @dev it should create pool.
    function test_CreatePool() external {
        poolFactory.createPool(address(nft));
        assertTrue(poolFactory.getPool(address(nft)) != address(0), "get pool");
    }

    /// @dev it should emit CreatePool
    function test_CreatePool_Event() external {
        string memory name = string.concat(IERC721Metadata(address(nft)).name(), " Pooled");
        string memory symbol = string.concat(IERC721Metadata(address(nft)).symbol(), "p");
        bytes32 salt = keccak256(abi.encodePacked(address(nft)));
        bytes memory bytecode = vm.getCode("out/Pool.sol/Pool.json");
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(poolFactory), salt, keccak256(bytecode)));
        address pool = address(uint160(uint256(hash)));

        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit CreatePool(name, symbol, address(nft), address(pool));
        poolFactory.createPool(address(nft));
    }
}
