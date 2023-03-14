// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { ERC721Vault_Test } from "../ERC721Vault.t.sol";

contract Deployment_Test is ERC721Vault_Test {
    /// @dev it should check if deployed with the correct values
    function test_Deployment() external {
        string memory actualName = erc721Vault.name();
        string memory expectedName = "JPEG Vault";
        assertEq(actualName, expectedName, "name");
        string memory actualSymbol = erc721Vault.symbol();
        string memory expectedSymbol = "JPEGv";
        assertEq(actualSymbol, expectedSymbol, "symbol");
        address actualAsset = erc721Vault.asset();
        address expectedAsset = address(nft);
        assertEq(actualAsset, expectedAsset, "asset");
    }
}
