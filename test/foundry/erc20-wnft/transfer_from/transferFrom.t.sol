// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { stdError } from "forge-std/Test.sol";

import { ERC20Wnft_Test } from "../ERC20Wnft.t.sol";

contract TransferFrom_Test is ERC20Wnft_Test {
    /// @dev it should revert.
    function test_RevertWhen_SpenderAllowanceNotEnough(address owner, uint256 amount) external {
        vm.assume(owner != address(0));
        vm.assume(amount > 0);

        address spender = users.alice;
        vm.expectRevert(stdError.arithmeticError);
        erc20Wnft.transferFrom(owner, spender, amount);
    }

    /// @dev Checks common assumptions for the tests below.
    function checkAssumptions(
        address owner,
        address to,
        uint256 amount0,
        uint256 amount1
    ) internal pure {
        vm.assume(owner != address(0) && to != address(0));
        vm.assume(owner != to);
        vm.assume(amount1 > 0);
        vm.assume(amount1 <= amount0);
    }

    /// @dev it should transfer the tokens.
    function testFuzz_TransferFrom(
        address owner,
        address to,
        uint256 amount0,
        uint256 amount1
    ) external {
        amount0 = bound(amount0, 1, UINT256_MAX - erc20Wnft.totalSupply());
        checkAssumptions(owner, to, amount0, amount1);

        // Mint `amount` tokens to the owner.
        erc20Wnft.__godMode_mint(owner, amount0);

        // Approve Alice to spend tokens from the owner.
        address spender = users.alice;
        changePrank(owner);
        erc20Wnft.approve(spender, amount0);

        changePrank(spender);
        uint256 previousOwnerBalance = erc20Wnft.balanceOf(owner);
        uint256 previousToBalance = erc20Wnft.balanceOf(to);
        uint256 previousAllowance = erc20Wnft.allowance(owner, spender);
        erc20Wnft.transferFrom(owner, to, amount1);

        uint256 actualOwnerBalance = erc20Wnft.balanceOf(owner);
        uint256 actualToBalance = erc20Wnft.balanceOf(to);
        uint256 expectedOwnerBalance = previousOwnerBalance - amount1;
        uint256 expectedToBalance = previousToBalance + amount1;
        if (previousAllowance < UINT256_MAX) {
            uint256 actualAllowance = erc20Wnft.allowance(owner, spender);
            uint256 expectedAllowance = previousAllowance - amount1;
            assertEq(actualAllowance, expectedAllowance, "allowance");
        }
        assertEq(actualOwnerBalance, expectedOwnerBalance, "owner balance");
        assertEq(actualToBalance, expectedToBalance, "to balance");
    }

    /// @dev it should emit an Approval and a Transfer event.
    function testFuzz_TransferFrom_Event(
        address owner,
        address to,
        uint256 amount0,
        uint256 amount1
    ) external {
        amount0 = bound(amount0, 1, UINT256_MAX - erc20Wnft.totalSupply());
        checkAssumptions(owner, to, amount0, amount1);

        // Mint `amount0` tokens to the owner.
        erc20Wnft.__godMode_mint(owner, amount0);

        // Approve Alice to spend tokens from the owner.
        address spender = users.alice;
        changePrank(owner);
        erc20Wnft.approve(spender, amount0);

        changePrank(spender);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit Transfer(owner, to, amount1);
        erc20Wnft.transferFrom(owner, to, amount1);
    }
}
