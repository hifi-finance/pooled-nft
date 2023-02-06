// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { VaultTest } from "../Vault.t.sol";

contract Constructor_Test is VaultTest {
    /// @dev it should check if constructor parameters are set correctly
    function test_ConstructorParameters() external {
        string memory actualName = vault.name();
        string memory expectedName = "JPEG Vault";
        assertEq(actualName, expectedName, "name");
        string memory actualSymbol = vault.symbol();
        string memory expectedSymbol = "vJPEG";
        assertEq(actualSymbol, expectedSymbol, "symbol");
        address actualAsset = vault.asset();
        address expectedAsset = address(nft);
        assertEq(actualAsset, expectedAsset, "asset");
    }
}
