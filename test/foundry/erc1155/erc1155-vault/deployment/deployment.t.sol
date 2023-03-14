// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { ERC1155Vault_Test } from "../ERC1155Vault.t.sol";

contract Deployment_Test is ERC1155Vault_Test {
    /// @dev it should check if deployed with the correct values
    function test_Deployment() external {
        address actualAsset = erc1155Vault.asset();
        address expectedAsset = address(erc1155);
        assertEq(actualAsset, expectedAsset, "asset");
        uint256 actualAssetId = erc1155Vault.assetId();
        uint256 expectedAssetId = 123;
        assertEq(actualAssetId, expectedAssetId, "assetId");
        address actualAdmin = erc1155Vault.admin();
        address expectedAdmin = msg.sender;
        assertEq(actualAdmin, expectedAdmin, "admin");
    }
}
