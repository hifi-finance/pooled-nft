// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { PoolTest } from "../Pool.t.sol";

contract Constructor_Test is PoolTest {
    /// @dev it should check if constructor parameters are set correctly
    function test_ConstructorParameters() external {
        string memory actualName = pool.name();
        string memory expectedName = "JPEG Pool";
        assertEq(actualName, expectedName, "name");
        string memory actualSymbol = pool.symbol();
        string memory expectedSymbol = "pJPEG";
        assertEq(actualSymbol, expectedSymbol, "symbol");
        address actualAsset = pool.asset();
        address expectedAsset = address(nft);
        assertEq(actualAsset, expectedAsset, "asset");
    }
}
