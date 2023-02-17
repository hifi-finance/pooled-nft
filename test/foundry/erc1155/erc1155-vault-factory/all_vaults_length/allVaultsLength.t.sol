// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

//import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { IERC1155VaultFactory } from "contracts/ERC-1155/IERC1155VaultFactory.sol";
import { ERC1155VaultFactory_Test } from "../ERC1155VaultFactory.t.sol";

contract AllVaultsLength_Test is ERC1155VaultFactory_Test {
    function test_AllVaultsLength_WhenNoVaultsExist() external {
        assertEq(erc1155VaultFactory.allVaultsLength(), 0, "allVaultsLength");
    }

    function test_AllVaultsLength_WhenVaultsExist() external {
        erc1155VaultFactory.createVault(address(erc1155), 123);
        uint256 expectedAllVaultsLength = erc1155VaultFactory.allVaultsLength();
        assertEq(expectedAllVaultsLength, 1, "allVaultsLength");
    }
}
