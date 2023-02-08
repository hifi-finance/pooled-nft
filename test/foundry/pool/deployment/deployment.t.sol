// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { PoolTest } from "../Pool.t.sol";

contract Deployment_Test is PoolTest {
    /// @dev it should check if deployed with the correct values
    function test_Deployment() external {
        string memory actualName = pool.name();
        string memory expectedName = "JPEG Pooled";
        assertEq(actualName, expectedName, "name");
        string memory actualSymbol = pool.symbol();
        string memory expectedSymbol = "JPEGp";
        assertEq(actualSymbol, expectedSymbol, "symbol");
        address actualAsset = pool.asset();
        address expectedAsset = address(nft);
        assertEq(actualAsset, expectedAsset, "asset");
    }
}
