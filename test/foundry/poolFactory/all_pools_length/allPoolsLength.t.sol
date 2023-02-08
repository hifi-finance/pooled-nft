// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import { IPoolFactory } from "contracts/IPoolFactory.sol";
import { PoolFactoryTest } from "../PoolFactory.t.sol";

contract AllPoolsLength_Test is PoolFactoryTest {
    function test_AllPoolsLength_WhenNoPoolsExist() external {
        assertEq(poolFactory.allPoolsLength(), 0, "allPoolsLength");
    }

    function test_AllPoolsLength_WhenPoolsExist() external {
        poolFactory.createPool(address(nft));
        uint256 expectedAllPoolsLength = poolFactory.allPoolsLength();
        assertEq(expectedAllPoolsLength, 1, "allPoolsLength");
    }
}
