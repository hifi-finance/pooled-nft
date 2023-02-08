// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import { IVaultFactory } from "contracts/IVaultFactory.sol";
import { VaultFactoryTest } from "../VaultFactory.t.sol";

contract AllVaultsLength_Test is VaultFactoryTest {
    function test_AllVaultsLength_WhenNoVaultsExist() external {
        assertEq(vaultFactory.allVaultsLength(), 0, "allVaultsLength");
    }

    function test_AllVaultsLength_WhenVaultsExist() external {
        vaultFactory.createVault(address(nft));
        uint256 expectedAllVaultsLength = vaultFactory.allVaultsLength();
        assertEq(expectedAllVaultsLength, 1, "allVaultsLength");
    }
}
