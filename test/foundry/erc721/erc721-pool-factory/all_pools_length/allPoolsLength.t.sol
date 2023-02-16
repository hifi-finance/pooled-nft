// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import { IERC721PoolFactory } from "contracts/ERC-721/IERC721PoolFactory.sol";
import { ERC721PoolFactory_Test } from "../ERC721PoolFactory.t.sol";

contract AllPoolsLength_Test is ERC721PoolFactory_Test {
    function test_AllPoolsLength_WhenNoPoolsExist() external {
        assertEq(erc721PoolFactory.allPoolsLength(), 0, "allPoolsLength");
    }

    function test_AllPoolsLength_WhenPoolsExist() external {
        erc721PoolFactory.createPool(address(nft));
        uint256 expectedAllPoolsLength = erc721PoolFactory.allPoolsLength();
        assertEq(expectedAllPoolsLength, 1, "allPoolsLength");
    }
}
