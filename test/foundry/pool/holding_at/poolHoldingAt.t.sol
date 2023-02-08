// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { stdError } from "forge-std/Test.sol";
import { PoolTest } from "../Pool.t.sol";

contract PoolHoldingAt_Test is PoolTest {
    /// @dev it should revert.
    function test_RevertWhen_HoldingsSetEmpty() external {
        vm.expectRevert(stdError.indexOOBError);
        pool.holdingAt(0);
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

    /// @dev it should return the correct value of holdings for given index.
    function testFuzz_HoldingAt_ReturnCorrectValue(uint256 index, uint256[] calldata inIds) external {
        checkAssumptions(inIds);
        vm.assume(index < inIds.length);
        pool.__godMode_setHoldings(inIds);
        assertEq(pool.holdingAt(index), inIds[index], "holdings at");
    }
}
