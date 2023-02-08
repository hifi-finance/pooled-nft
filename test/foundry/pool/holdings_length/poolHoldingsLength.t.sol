// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { stdError } from "forge-std/Test.sol";
import { PoolTest } from "../Pool.t.sol";

contract PoolHoldingsLength_Test is PoolTest {
    /// @dev it should return the lenght of holdings when set is empty.
    function test_HoldingsLength_WhenSetIsEmpty() external {
        assertEq(pool.holdingsLength(), 0, "holdings lenght when set is empty");
    }

    /// @dev Checks common assumptions for the test. assume each inIds value is unique.
    function checkAssumptions(uint256[] memory inIds) internal pure {
        vm.assume(inIds.length != 0);
        for (uint256 i = 0; i < inIds.length; i++) {
            for (uint256 j = i + 1; j < inIds.length; j++) {
                vm.assume(inIds[i] != inIds[j]);
            }
        }
    }

    /// @dev it should return the lenght of holdings when set is not empty.
    function testFuzz_HoldingsLength_WhenSetIsNotEmpty(uint256[] calldata inIds) external {
        checkAssumptions(inIds);
        pool.__godMode_setHoldings(inIds);
        assertEq(pool.holdingsLength(), inIds.length, "holdings lenght when set is not empty");
    }
}
