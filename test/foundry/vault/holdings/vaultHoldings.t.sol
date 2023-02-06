// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { stdError } from "forge-std/Test.sol";
import { VaultTest } from "../Vault.t.sol";

contract VaultHoldings_Test is VaultTest {
    /// @dev it should revert.
    function test_RevertWhen_HoldingsSetEmpty() external {
        vm.expectRevert(stdError.indexOOBError);
        vault.holdingAt(users.alice, 0);
    }

    /// @dev it should return the correct value of holdings for given index.
    function testFuzz_HoldingAt_ReturnCorrectValue(
        address beneficiary,
        uint256 index,
        uint256[] memory inIds
    ) external {
        checkAssumptions(beneficiary, inIds);
        vm.assume(index < inIds.length);
        mintVaultTokens(beneficiary, inIds);
        assertEq(vault.holdingAt(beneficiary, index), inIds[index], "holdings at");
    }

    /// @dev it should return the length of holdings as zero when set is empty.
    function test_HoldingsLength_WhenSetIsEmpty() external {
        assertEq(vault.holdingsLength(users.alice), 0, "holdings lenght when set is empty");
    }

    /// @dev it should return the length of holdings when set is not empty.
    function testFuzz_HoldingsLength_WhenSetIsNotEmpty(address beneficiary, uint256[] memory inIds) external {
        checkAssumptions(beneficiary, inIds);
        mintVaultTokens(beneficiary, inIds);
        assertEq(vault.holdingsLength(beneficiary), inIds.length, "holdings lenght when set is not empty");
    }
}
