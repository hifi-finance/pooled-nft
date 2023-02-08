// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { VaultTest } from "../Vault.t.sol";

contract Deployment_Test is VaultTest {
    /// @dev it should check if deployed with the correct values
    function test_Deployment() external {
        string memory actualName = vault.name();
        string memory expectedName = "JPEG Vaulted";
        assertEq(actualName, expectedName, "name");
        string memory actualSymbol = vault.symbol();
        string memory expectedSymbol = "JPEGv";
        assertEq(actualSymbol, expectedSymbol, "symbol");
        address actualAsset = vault.asset();
        address expectedAsset = address(nft);
        assertEq(actualAsset, expectedAsset, "asset");
    }
}
