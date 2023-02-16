// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { stdError } from "forge-std/Test.sol";
import { ERC721Vault_Test } from "../ERC721Vault.t.sol";

contract VaultHoldingsLength_Test is ERC721Vault_Test {
    /// @dev it should return the lenght of holdings when set is empty.
    function test_HoldingsLength_WhenSetIsEmpty() external {
        assertEq(erc721Vault.holdingsLength(users.alice), 0, "holdings lenght when set is empty");
    }

    /// @dev Checks common assumptions for the test.
    function checkAssumptions(address beneficiary, uint256[] memory inIds) internal pure {
        vm.assume(inIds.length != 0);
        vm.assume(beneficiary != address(0));
        for (uint256 i = 0; i < inIds.length; i++) {
            for (uint256 j = i + 1; j < inIds.length; j++) {
                vm.assume(inIds[i] != inIds[j]);
            }
        }
    }

    /// @dev it should return the length of holdings when set is not empty.
    function testFuzz_HoldingsLength_WhenSetIsNotEmpty(address beneficiary, uint256[] memory inIds) external {
        checkAssumptions(beneficiary, inIds);
        erc721Vault.__godMode_setHoldings(beneficiary, inIds);
        assertEq(erc721Vault.holdingsLength(beneficiary), inIds.length, "holdings lenght when set is not empty");
    }
}
