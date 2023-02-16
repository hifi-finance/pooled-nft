// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import { IERC721VaultFactory } from "contracts/ERC-721/IERC721VaultFactory.sol";
import { ERC721VaultFactory_Test } from "../ERC721VaultFactory.t.sol";

contract AllVaultsLength_Test is ERC721VaultFactory_Test {
    function test_AllVaultsLength_WhenNoVaultsExist() external {
        assertEq(erc721VaultFactory.allVaultsLength(), 0, "allVaultsLength");
    }

    function test_AllVaultsLength_WhenVaultsExist() external {
        erc721VaultFactory.createVault(address(nft));
        uint256 expectedAllVaultsLength = erc721VaultFactory.allVaultsLength();
        assertEq(expectedAllVaultsLength, 1, "allVaultsLength");
    }
}
