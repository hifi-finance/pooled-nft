// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { ERC721Pool_Test } from "../ERC721Pool.t.sol";

contract Deployment_Test is ERC721Pool_Test {
    /// @dev it should check if deployed with the correct values
    function test_Deployment() external {
        string memory actualName = erc721Pool.name();
        string memory expectedName = "JPEG Pool";
        assertEq(actualName, expectedName, "name");
        string memory actualSymbol = erc721Pool.symbol();
        string memory expectedSymbol = "JPEGp";
        assertEq(actualSymbol, expectedSymbol, "symbol");
        address actualAsset = erc721Pool.asset();
        address expectedAsset = address(nft);
        assertEq(actualAsset, expectedAsset, "asset");
    }
}
