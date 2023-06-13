// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import { IERC721PoolFactory } from "contracts/ERC-721/IERC721PoolFactory.sol";
import { ERC721PoolFactory_Test } from "../ERC721PoolFactory.t.sol";

contract CreatePool_Test is ERC721PoolFactory_Test {
    mapping(address => uint256) public assetNonces;

    /// @dev it should revert.
    function test_RevertWhen_DoesNotImplementIERC721Metadata() external {
        vm.expectRevert(IERC721PoolFactory.ERC721PoolFactory__DoesNotImplementIERC721Metadata.selector);
        erc721PoolFactory.createPool(address(randomNft));
    }

    modifier poolAlreadyExists() {
        erc721PoolFactory.createPool(address(nft));
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_PoolAlreadyExists() external poolAlreadyExists {
        vm.expectRevert(IERC721PoolFactory.ERC721PoolFactory__PoolAlreadyExists.selector);
        erc721PoolFactory.createPool(address(nft));
    }

    /// @dev it should create pool.
    function test_CreatePool() external {
        erc721PoolFactory.createPool(address(nft));
        assertTrue(erc721PoolFactory.getPool(address(nft)) != address(0), "get pool");
    }

    /// @dev it should emit CreatePool
    function test_CreatePool_Event() external {
        string memory name = string.concat(IERC721Metadata(address(nft)).name(), " Pool");
        string memory symbol = string.concat(IERC721Metadata(address(nft)).symbol(), "p");
        bytes32 salt = keccak256(abi.encodePacked(address(nft), assetNonces[address(nft)]));
        assetNonces[address(nft)]++;
        bytes memory bytecode = vm.getCode("out/ERC721Pool.sol/ERC721Pool.json");
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(erc721PoolFactory), salt, keccak256(bytecode)));
        address pool = address(uint160(uint256(hash)));

        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit CreatePool(name, symbol, address(nft), address(pool));
        erc721PoolFactory.createPool(address(nft));
    }
}
