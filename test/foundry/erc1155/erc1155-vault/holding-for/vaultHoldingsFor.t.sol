// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { ERC1155Vault_Test } from "../ERC1155Vault.t.sol";

contract VaultHoldingAt_Test is ERC1155Vault_Test {
    /// @dev it should return the correct value of holdings for given account.
    function testFuzz_HoldingAt_ReturnCorrectValue(address beneficiary, uint256 inAmount) external {
        erc1155Vault.__godMode_setHoldings(beneficiary, inAmount);
        assertEq(erc1155Vault.holdingsFor(beneficiary), inAmount, "holdings for");
    }
}
