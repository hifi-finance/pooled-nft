// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { ERC20WnftTest } from "../ERC20Wnft.t.sol";

contract Approve_Test is ERC20WnftTest {
    /// @dev it should revert.
    function Skiptest_RevertWhen_OwnerZeroAddress() external {
        // Make the zero address the caller in this test.
        changePrank(address(0));

        vm.expectRevert();
        erc20Wnft.approve(users.alice, ONE_MILLION_WNFT);
    }

    /// @dev it should revert.
    function Skiptest_RevertWhen_SpenderZeroAddress() external {
        address spender = address(0);
        vm.expectRevert();
        erc20Wnft.approve(spender, ONE_MILLION_WNFT);
    }

    /// @dev it should make the approval.
    function testFuzz_Approve(address spender, uint256 value) external {
        vm.assume(spender != address(0));
        erc20Wnft.approve(spender, value);
        uint256 actualAllowance = erc20Wnft.allowance(users.alice, spender);
        uint256 expectedAllowance = value;
        assertEq(actualAllowance, expectedAllowance, "allowance");
    }

    /// @dev it should emit an Approval event.
    function testFuzz_Approve_Event(address spender, uint256 value) external {
        vm.assume(spender != address(0));
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: false, checkData: true });
        emit Approval(users.alice, spender, value);
        erc20Wnft.approve(spender, value);
    }
}
