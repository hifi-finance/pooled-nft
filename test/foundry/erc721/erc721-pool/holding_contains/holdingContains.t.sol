// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { stdError } from "forge-std/Test.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";

contract HoldingContains_Test is ERC721Pool_Test {
    /// @dev Checks common assumptions for the test. assume each inIds value is unique.
    function checkAssumptions(uint256[] memory inIds) internal pure {
        vm.assume(inIds.length != 0);
        for (uint256 i = 0; i < inIds.length; i++) {
            for (uint256 j = i + 1; j < inIds.length; j++) {
                vm.assume(inIds[i] != inIds[j]);
            }
        }
    }

    /// @dev it should returns true when asset token ID is held in the pool.
    function testFuzz_HoldingContains_ReturnsTrue(uint256 index, uint256[] calldata ids) external {
        checkAssumptions(ids);
        vm.assume(index < ids.length);
        erc721Pool.__godMode_setHoldings(ids);
        assertEq(erc721Pool.holdingContains(ids[index]), true, "holding set contains given NFT ID");
    }

    /// @dev it should returns false when asset token ID is not held in the pool.
    function testFuzz_HoldingContains_ReturnsFalse(uint256 id) external {
        assertEq(erc721Pool.holdingContains(id), false, "holdings set does not contain given NFT ID");
    }
}
