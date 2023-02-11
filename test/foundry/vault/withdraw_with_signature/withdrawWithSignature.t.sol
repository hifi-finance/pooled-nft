// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IVault } from "contracts/IVault.sol";
import { VaultTest } from "../Vault.t.sol";
import { SigUtils } from "test/foundry/utils/SigUtils.sol";
import { IERC20Wnft } from "contracts/IERC20Wnft.sol";

contract WithdrawWithSignature_Test is VaultTest {
    /// @dev Common set up for withdrawWithSignature
    function setUpWithdrawWithSignature(uint256[] memory outIds) internal {
        vm.assume(outIds.length != 0);
        //assume each inIds value is unique
        for (uint256 i = 0; i < outIds.length; i++) {
            for (uint256 j = i + 1; j < outIds.length; j++) {
                vm.assume(outIds[i] != outIds[j]);
            }
        }
        uint256 inAmount = outIds.length * 10**18;
        // mint nft to vault
        mintNft(address(vault), outIds);
        vault.__godMode_mint(users.alice, inAmount);
    }

    /// @dev ERC2612 permit signature
    function getPermitSignature(uint256 inAmount)
        internal
        view
        returns (bytes memory signature, SigUtils.Permit memory permit)
    {
        permit = SigUtils.Permit({
            owner: users.alice,
            spender: address(vault),
            value: inAmount,
            nonce: vault.nonces(users.alice),
            deadline: 1 days
        });
        bytes32 digest = sigUtils.getTypedDataHash(permit);
        uint256 privateKey = uint256(keccak256(abi.encodePacked("Alice")));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, digest);
        signature = abi.encodePacked(r, s, v);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_ExpiredPermit(uint256[] memory outIds) external {
        setUpWithdrawWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        // fast forward one second past the deadline
        vm.warp(permit.deadline + 1 seconds);
        vm.expectRevert(IERC20Wnft.ERC20Wnft__PermitExpired.selector);
        vault.withdrawWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_RecoveredAddressIsInvalid(uint256[] memory outIds) external {
        setUpWithdrawWithSignature(outIds);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(0);
        uint256 inAmount = outIds.length * 10**18;
        vm.expectRevert(IERC20Wnft.ERC20Wnft__InvalidSignature.selector);
        vault.withdrawWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }

    /// @dev it should revert.
    function test_RevertWhen_VaultTokenInAmountIsZero() external {
        uint256[] memory outIds;
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vm.expectRevert(IVault.Vault__InsufficientIn.selector);
        vault.withdrawWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_VaultTokenInOutMismatch(uint256 inAmount, uint256[] memory outIds) external {
        vm.assume(inAmount != 0);
        vm.assume(inAmount != outIds.length * 10**18);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vm.expectRevert(IVault.Vault__InOutMismatch.selector);
        vault.withdrawWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_BeneficiaryZeroAddress(uint256[] memory outIds) external {
        vm.assume(outIds.length > 0);
        uint256 inAmount = outIds.length * 10**18;
        address beneficiary = address(0);
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vm.expectRevert(IVault.Vault__InvalidTo.selector);
        vault.withdrawWithSignature(inAmount, outIds, beneficiary, permit.deadline, signature);
    }

    /// @dev it should burn vault token inAmount.
    function testFuzz_Withdraw_BurnVaultTokenInAmount(uint256[] memory outIds) external {
        setUpWithdrawWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        uint256 previousBalance = vault.balanceOf(users.alice);
        vault.withdrawWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
        uint256 actualBalance = vault.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance - inAmount;
        assertEq(actualBalance, expectedBalance, "burn vault tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Withdraw_RemoveAssetTokenIdsfromHoldings(uint256[] memory outIds) external {
        setUpWithdrawWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vault.__godMode_setHoldings(users.alice, outIds);
        uint256 previousHoldingsLength = vault.holdingsLength(users.alice);
        vault.withdrawWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
        uint256 actualHoldingsLength = vault.holdingsLength(users.alice);
        uint256 expectedHoldingsLength = previousHoldingsLength - outIds.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should transfer nft from vault contract to beneficiary
    function testFuzz_Withdraw_TransferNftOutIdsToBeneficiary(uint256[] memory outIds) external {
        setUpWithdrawWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        uint256 previousBalance = nft.balanceOf(users.alice);
        vault.withdrawWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
        uint256 actualBalance = nft.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + outIds.length;
        assertEq(actualBalance, expectedBalance, "transfer nft");
    }

    /// @dev it should emit Withdraw event.
    function testFuzz_Withdraw_Event(uint256[] memory outIds) external {
        setUpWithdrawWithSignature(outIds);
        uint256 inAmount = outIds.length * 10**18;
        (bytes memory signature, SigUtils.Permit memory permit) = getPermitSignature(inAmount);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Withdraw(inAmount, outIds, users.alice);
        vault.withdrawWithSignature(inAmount, outIds, users.alice, permit.deadline, signature);
    }
}
