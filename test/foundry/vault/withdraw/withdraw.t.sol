// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IVault } from "contracts/IVault.sol";
import { VaultTest } from "../Vault.t.sol";

contract Withdraw_Test is VaultTest {
    /// @dev it should revert.
    function test_RevertWhen_VaultTokenInAmountIsZero() external {
        uint256 inAmount = 0;
        uint256[] memory outIds = new uint256[](1);
        outIds[0] = 1;
        vm.expectRevert(IVault.Vault__InsufficientIn.selector);
        vault.withdraw(inAmount, outIds, users.alice);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_VaultTokenInOutMismatch(uint256[] memory outIds) external {
        uint256 inAmount = 1;
        vm.expectRevert(IVault.Vault__InOutMismatch.selector);
        vault.withdraw(inAmount, outIds, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        address beneficiary = address(0);
        uint256[] memory outIds = new uint256[](1);
        outIds[0] = 1;
        uint256 inAmount = outIds.length * 10**18;
        vm.expectRevert(IVault.Vault__InvalidTo.selector);
        vault.withdraw(inAmount, outIds, beneficiary);
    }

    /// @dev Common set up for redeem
    function setUpWithdraw(address beneficiary, uint256[] memory outIds) internal {
        vm.assume(outIds.length != 0);
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(vault));

        //assume each inIds value is unique
        for (uint256 i = 0; i < outIds.length; i++) {
            for (uint256 j = i + 1; j < outIds.length; j++) {
                vm.assume(outIds[i] != outIds[j]);
            }
        }
        // mint nft to vault
        mintNft(address(vault), outIds);
        // Mint vault tokens so that we have what to burn.
        uint256 inAmount = outIds.length * 10**18;
        vault.__godMode_mint(beneficiary, inAmount);
        changePrank(beneficiary);
    }

    /// @dev it should burn vault token inAmount.
    function testFuzz_Withdraw_BurnVaultTokenInAmount(address beneficiary, uint256[] memory outIds) external {
        setUpWithdraw(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        uint256 previousBalance = vault.balanceOf(beneficiary);
        vault.withdraw(inAmount, outIds, beneficiary);
        uint256 actualBalance = vault.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance - inAmount;
        assertEq(actualBalance, expectedBalance, "burn vault tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Withdraw_RemoveAssetTokenIdsfromHoldings(address beneficiary, uint256[] memory outIds) external {
        setUpWithdraw(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        vault.__godMode_setHoldings(beneficiary, outIds);
        uint256 previousHoldingsLength = vault.holdingsLength(beneficiary);
        vault.withdraw(inAmount, outIds, beneficiary);
        uint256 actualHoldingsLength = vault.holdingsLength(beneficiary);
        uint256 expectedHoldingsLength = previousHoldingsLength - outIds.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should transfer nft from vault contract to beneficiary
    function testFuzz_Withdraw_TransferNftOutIdsToBeneficiary(address beneficiary, uint256[] memory outIds) external {
        setUpWithdraw(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        uint256 previousBalance = nft.balanceOf(beneficiary);
        vault.withdraw(inAmount, outIds, beneficiary);
        uint256 actualBalance = nft.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance + outIds.length;
        assertEq(actualBalance, expectedBalance, "transfer nft");
    }

    /// @dev it should emit Withdraw event.
    function testFuzz_Withdraw_Event(address beneficiary, uint256[] memory outIds) external {
        setUpWithdraw(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Withdraw(inAmount, outIds, beneficiary);
        vault.withdraw(inAmount, outIds, beneficiary);
    }
}
