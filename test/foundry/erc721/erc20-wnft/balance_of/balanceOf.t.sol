// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { ERC20Wnft_Test } from "../ERC20Wnft.t.sol";

contract BalanceOf_Test is ERC20Wnft_Test {
    /// @dev it should return zero.
    function test_BalanceOf_DoesNotHaveBalance(address foo) external {
        uint256 actualBalance = erc20Wnft.balanceOf(foo);
        uint256 expectedBalance = 0;
        assertEq(actualBalance, expectedBalance, "balance");
    }

    /// @dev it should return the correct balance.
    function testFuzz_BalanceOf_HasBalance(address foo, uint256 amount) external {
        vm.assume(foo != address(0));
        vm.assume(amount < ONE_MILLION_WNFT);

        // Mint `amount` tokens to `foo`.
        erc20Wnft.__godMode_mint(foo, amount);

        uint256 actualBalance = erc20Wnft.balanceOf(foo);
        uint256 expectedBalance = amount;
        assertEq(actualBalance, expectedBalance, "balance");
    }
}
