// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { stdError } from "forge-std/Test.sol";

import { ERC20Wnft_Test } from "../ERC20Wnft.t.sol";

contract Transfer_Test is ERC20Wnft_Test {
    /// @dev it should revert.
    function skiptest_RevertWhen_SenderZeroAddress() external {
        erc20Wnft.__godMode_mint(address(0), ONE_MILLION_WNFT);
        // Make the zero address the caller in this test.
        changePrank(address(0));

        vm.expectRevert();
        erc20Wnft.transfer(users.alice, ONE_MILLION_WNFT);
    }

    /// @dev it should revert.
    function skiptest_RevertWhen_RecipientZeroAddress() external {
        erc20Wnft.__godMode_mint(users.alice, ONE_MILLION_WNFT);
        vm.expectRevert();
        address to = address(0);
        erc20Wnft.transfer(to, ONE_MILLION_WNFT);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_SenderNotEnoughBalance(uint256 amount) external {
        vm.assume(amount > 0);

        vm.expectRevert(stdError.arithmeticError);
        erc20Wnft.transfer(users.bob, amount);
    }

    /// @dev it should transfer the tokens.
    function testFuzz_Transfer_RecipientSender(uint256 amount) external {
        amount = bound(amount, 1, UINT256_MAX - erc20Wnft.totalSupply());

        // Mint `amount` tokens to Alice so that we have something to transfer below.
        erc20Wnft.__godMode_mint(users.alice, amount);

        uint256 expectedBalance = erc20Wnft.balanceOf(users.alice);
        erc20Wnft.transfer(users.alice, amount);
        uint256 actualBalance = erc20Wnft.balanceOf(users.alice);
        assertEq(actualBalance, expectedBalance, "balance");
    }

    /// @dev Checks common assumptions for the tests below.
    function checkAssumptions(address to) internal view {
        vm.assume(to != address(0));
        vm.assume(to != users.alice);
    }

    /// @dev it should transfer the tokens.
    function testFuzz_Transfer_RecipientNotSender(address to, uint256 amount) external {
        checkAssumptions(to);
        amount = bound(amount, 1, UINT256_MAX - erc20Wnft.totalSupply());

        //Mint `amount` tokens to Alice so that we have something to transfer below.
        erc20Wnft.__godMode_mint(users.alice, amount);

        uint256 previousBalance = erc20Wnft.balanceOf(to);
        erc20Wnft.transfer(to, amount);
        uint256 actualBalance = erc20Wnft.balanceOf(to);
        uint256 expectedBalance = previousBalance + amount;
        assertEq(actualBalance, expectedBalance, "balance");
    }

    /// @dev it should emit a Transfer event.
    function testFuzz_Transfer_RecipientNotSender_Event(address to, uint256 amount) external {
        checkAssumptions(to);
        amount = bound(amount, 1, UINT256_MAX - erc20Wnft.totalSupply());

        // Mint `amount` tokens to Alice so that we have something to transfer below.
        erc20Wnft.__godMode_mint(users.alice, amount);

        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit Transfer(users.alice, to, amount);
        erc20Wnft.transfer(to, amount);
    }
}
