// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { IERC1155PoolFactory } from "contracts/ERC-1155/IERC1155PoolFactory.sol";
import { ERC1155PoolFactory_Test } from "../ERC1155PoolFactory.t.sol";

contract AllPoolsLength_Test is ERC1155PoolFactory_Test {
    function test_AllPoolsLength_WhenNoPoolsExist() external {
        assertEq(erc1155PoolFactory.allPoolsLength(), 0, "allPoolsLength");
    }

    function testFuzz_AllPoolsLength_WhenPoolsExist(uint256 assetId) external {
        erc1155PoolFactory.createPool(address(erc1155), assetId);
        uint256 expectedAllPoolsLength = erc1155PoolFactory.allPoolsLength();
        assertEq(expectedAllPoolsLength, 1, "allPoolsLength");
    }
}
