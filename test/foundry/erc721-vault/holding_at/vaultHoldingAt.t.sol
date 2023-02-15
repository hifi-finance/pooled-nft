// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { stdError } from "forge-std/Test.sol";
import { ERC721Vault_Test } from "../ERC721Vault.t.sol";

contract VaultHoldingAt_Test is ERC721Vault_Test {
    /// @dev it should revert.
    function test_RevertWhen_HoldingsSetEmpty() external {
        vm.expectRevert(stdError.indexOOBError);
        erc721Vault.holdingAt(users.alice, 0);
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

    /// @dev it should return the correct value of holdings for given index.
    function testFuzz_HoldingAt_ReturnCorrectValue(
        address beneficiary,
        uint256 index,
        uint256[] memory inIds
    ) external {
        checkAssumptions(beneficiary, inIds);
        vm.assume(index < inIds.length);
        erc721Vault.__godMode_setHoldings(beneficiary, inIds);
        assertEq(erc721Vault.holdingAt(beneficiary, index), inIds[index], "holdings at");
    }
}
