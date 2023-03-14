// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC1155Vault } from "contracts/ERC-1155/IERC1155Vault.sol";
import { ERC1155Vault_Test } from "../ERC1155Vault.t.sol";

contract Deposit_Test is ERC1155Vault_Test {
    /// @dev it should revert.
    function test_RevertWhen_InIdsIsEmpty() external {
        uint256 inAmount;
        vm.expectRevert(IERC1155Vault.ERC1155Vault__InsufficientIn.selector);
        erc1155Vault.deposit(inAmount, 1, users.alice);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_InOutMismatch(uint256 inAmount, uint256 outAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        vm.assume(inAmount * 10**18 != outAmount);
        vm.expectRevert(IERC1155Vault.ERC1155Vault__InOutMismatch.selector);
        erc1155Vault.deposit(inAmount, outAmount, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        address beneficiary = address(0);
        uint256 inAmount = 1;
        uint256 outAmount = inAmount * 10**18;
        vm.expectRevert(IERC1155Vault.ERC1155Vault__InvalidTo.selector);
        erc1155Vault.deposit(inAmount, outAmount, beneficiary);
    }

    /// @dev Common set up for deposit
    function setUpDeposit(address beneficiary, uint256 inAmount) internal {
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(erc1155Vault));
        mintNft(beneficiary, erc1155Vault.assetId(), inAmount);
        changePrank(beneficiary);
        erc1155.setApprovalForAll(address(erc1155Vault), true);
    }

    /// @dev it should add given token InAmount to holdings.
    function testFuzz_Deposit_IncrementHoldingsByInAmount(address beneficiary, uint256 inAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        setUpDeposit(beneficiary, inAmount);
        uint256 outAmount = inAmount * 10**18;
        uint256 previousHoldings = erc1155Vault.holdingsFor(beneficiary);
        erc1155Vault.deposit(inAmount, outAmount, beneficiary);
        uint256 actualHoldings = erc1155Vault.holdingsFor(beneficiary);
        uint256 expectedHoldings = previousHoldings + inAmount;
        assertEq(actualHoldings, expectedHoldings, "holdings");
    }

    /// @dev it should transfer erc1155 from msg.sender to erc1155Vault contract.
    function testFuzz_Deposit_TransferNftFromSender(address beneficiary, uint256 inAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        setUpDeposit(beneficiary, inAmount);
        uint256 outAmount = inAmount * 10**18;
        uint256 previousBalance = erc1155.balanceOf(address(erc1155Vault), erc1155Vault.assetId());
        erc1155Vault.deposit(inAmount, outAmount, beneficiary);
        uint256 actualBalance = erc1155.balanceOf(address(erc1155Vault), erc1155Vault.assetId());
        uint256 expectedBalance = previousBalance + inAmount;
        assertEq(actualBalance, expectedBalance, "transferFrom");
    }

    /// @dev it should transfer erc1155Vault tokens to beneficiary.
    function testFuzz_Deposit_TransferVaultTokensToBeneficiary(address beneficiary, uint256 inAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        setUpDeposit(beneficiary, inAmount);
        uint256 outAmount = inAmount * 10**18;
        uint256 previousBalance = erc1155Vault.balanceOf(beneficiary);
        erc1155Vault.deposit(inAmount, outAmount, beneficiary);
        uint256 actualBalance = erc1155Vault.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance + inAmount * 10**18;
        assertEq(actualBalance, expectedBalance, "mint erc1155Vault tokens");
    }

    /// @dev it should emit Deposit event.
    function testFuzz_Deposit_Event(address beneficiary, uint256 inAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        setUpDeposit(beneficiary, inAmount);
        uint256 outAmount = inAmount * 10**18;
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        emit Deposit(inAmount, outAmount, beneficiary);
        erc1155Vault.deposit(inAmount, outAmount, beneficiary);
    }
}
