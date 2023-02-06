// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { stdError } from "forge-std/Test.sol";
import { PoolTest } from "../Pool.t.sol";

contract PoolHoldings_Test is PoolTest {
    /// @dev it should revert.
    function test_RevertWhen_HoldingsSetEmpty() external {
        vm.expectRevert(stdError.indexOOBError);
        pool.holdingAt(0);
    }

    /// @dev it should return the correct value of holdings for given index.
    function testFuzz_HoldingAt_ReturnCorrectValue(
        address beneficiary,
        uint256 index,
        uint256[] calldata inIds
    ) external {
        checkAssumptions(beneficiary, inIds);
        vm.assume(index < inIds.length);

        mintPoolTokens(beneficiary, inIds);
        assertEq(pool.holdingAt(index), inIds[index], "holdings at");
    }

    /// @dev it should return the lenght of holdings when set is empty.
    function test_HoldingsLength_WhenSetIsEmpty() external {
        assertEq(pool.holdingsLength(), 0, "holdings lenght when set is empty");
    }

    /// @dev it should return the lenght of holdings when set is not empty.
    function testFuzz_HoldingsLength_WhenSetIsNotEmpty(address beneficiary, uint256[] calldata inIds) external {
        checkAssumptions(beneficiary, inIds);
        mintPoolTokens(beneficiary, inIds);
        assertEq(pool.holdingsLength(), inIds.length, "holdings lenght when set is not empty");
    }
}
