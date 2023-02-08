// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IVault } from "contracts/IVault.sol";
import { VaultTest } from "../Vault.t.sol";

contract Deposit_Test is VaultTest {
    /// @dev it should revert.
    function test_RevertWhen_InIdsIsEmpty() external {
        uint256[] memory inIds;
        vm.expectRevert(IVault.Vault__InsufficientIn.selector);
        vault.deposit(inIds, 1, users.alice);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_InOutMismatch(uint256[] memory inIds, uint256 outAmount) external {
        vm.assume(inIds.length > 0);
        vm.assume(inIds.length * 10**18 != outAmount);
        vm.expectRevert(IVault.Vault__InOutMismatch.selector);
        vault.deposit(inIds, outAmount, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        address beneficiary = address(0);
        uint256[] memory inIds = new uint256[](1);
        inIds[0] = 1;
        uint256 outAmount = inIds.length * 10**18;
        vm.expectRevert(IVault.Vault__InvalidTo.selector);
        vault.deposit(inIds, outAmount, beneficiary);
    }

    /// @dev Common set up for deposit
    function setUpDeposit(address beneficiary, uint256[] memory inIds) internal {
        vm.assume(inIds.length != 0);
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(vault));
        //assume each inIds value is unique
        for (uint256 i = 0; i < inIds.length; i++) {
            for (uint256 j = i + 1; j < inIds.length; j++) {
                vm.assume(inIds[i] != inIds[j]);
            }
        }
        mintNft(beneficiary, inIds);
        changePrank(beneficiary);
        nft.setApprovalForAll(address(vault), true);
    }

    /// @dev it should add given tokenIds to holdings.
    function testFuzz_Deposit_AddAssetTokenIdsToHoldings(address beneficiary, uint256[] memory inIds) external {
        setUpDeposit(beneficiary, inIds);
        uint256 outAmount = inIds.length * 10**18;
        vault.deposit(inIds, outAmount, beneficiary);
        for (uint256 i; i < inIds.length; ++i) {
            assertEq(vault.holdingAt(beneficiary, i), inIds[i], "holding at");
        }
    }

    /// @dev it should transfer nft from msg.sender to vault contract.
    function testFuzz_Deposit_TransferNftFromSender(address beneficiary, uint256[] memory inIds) external {
        setUpDeposit(beneficiary, inIds);
        uint256 outAmount = inIds.length * 10**18;
        uint256 previousBalance = nft.balanceOf(address(vault));
        vault.deposit(inIds, outAmount, beneficiary);
        uint256 actualBalance = nft.balanceOf(address(vault));
        uint256 expectedBalance = previousBalance + inIds.length;
        assertEq(actualBalance, expectedBalance, "transferFrom");
    }

    /// @dev it should transfer vault tokens to beneficiary.
    function testFuzz_Deposit_TransferVaultTokensToBeneficiary(address beneficiary, uint256[] memory inIds) external {
        setUpDeposit(beneficiary, inIds);
        uint256 outAmount = inIds.length * 10**18;
        uint256 previousBalance = vault.balanceOf(beneficiary);
        vault.deposit(inIds, outAmount, beneficiary);
        uint256 actualBalance = vault.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance + inIds.length * 10**18;
        assertEq(actualBalance, expectedBalance, "mint vault tokens");
    }

    /// @dev it should emit Deposit event.
    function testFuzz_Deposit_Event(address beneficiary, uint256[] memory inIds) external {
        setUpDeposit(beneficiary, inIds);
        uint256 outAmount = inIds.length * 10**18;
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Deposit(inIds, outAmount, beneficiary);
        vault.deposit(inIds, outAmount, beneficiary);
    }
}
