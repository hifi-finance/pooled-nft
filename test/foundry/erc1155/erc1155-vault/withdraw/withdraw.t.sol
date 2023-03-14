// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC1155Vault } from "contracts/ERC-1155/IERC1155Vault.sol";
import { ERC1155Vault_Test } from "../ERC1155Vault.t.sol";

contract Withdraw_Test is ERC1155Vault_Test {
    /// @dev it should revert.
    function test_RevertWhen_VaultTokenInAmountIsZero() external {
        uint256 inAmount = 0;
        uint256 outAmount = 1;
        vm.expectRevert(IERC1155Vault.ERC1155Vault__InsufficientIn.selector);
        erc1155Vault.withdraw(inAmount, outAmount, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_VaultTokenInOutMismatch() external {
        uint256 inAmount = 1;
        uint256 outAmount = 2;
        vm.expectRevert(IERC1155Vault.ERC1155Vault__InOutMismatch.selector);
        erc1155Vault.withdraw(inAmount, outAmount, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        address beneficiary = address(0);
        uint256 outAmount = 1;
        uint256 inAmount = outAmount * 10**18;
        vm.expectRevert(IERC1155Vault.ERC1155Vault__InvalidTo.selector);
        erc1155Vault.withdraw(inAmount, outAmount, beneficiary);
    }

    /// @dev Common set up for redeem
    function setUpWithdraw(address beneficiary, uint256 outAmount) internal {
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(erc1155Vault));

        // mint erc1155 to erc1155Vault
        mintNft(address(erc1155Vault), erc1155Vault.assetId(), outAmount);
        // Mint erc1155Vault tokens so that we have what to burn.
        uint256 inAmount = outAmount * 10**18;
        erc1155Vault.__godMode_mint(beneficiary, inAmount);
        erc1155Vault.__godMode_setHoldings(beneficiary, outAmount);
        changePrank(beneficiary);
    }

    /// @dev it should burn erc1155Vault token inAmount.
    function testFuzz_Withdraw_BurnVaultTokenInAmount(address beneficiary, uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        setUpWithdraw(beneficiary, outAmount);
        uint256 inAmount = outAmount * 10**18;
        uint256 previousBalance = erc1155Vault.balanceOf(beneficiary);
        erc1155Vault.withdraw(inAmount, outAmount, beneficiary);
        uint256 actualBalance = erc1155Vault.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance - inAmount;
        assertEq(actualBalance, expectedBalance, "burn erc1155Vault tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Withdraw_RemoveAssetOutAmountfromHoldings(address beneficiary, uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        setUpWithdraw(beneficiary, outAmount);
        uint256 inAmount = outAmount * 10**18;
        uint256 previousHoldings = erc1155Vault.holdingsFor(beneficiary);
        erc1155Vault.withdraw(inAmount, outAmount, beneficiary);
        uint256 actualHoldings = erc1155Vault.holdingsFor(beneficiary);
        uint256 expectedHoldings = previousHoldings - outAmount;
        assertEq(actualHoldings, expectedHoldings, "holding at");
    }

    /// @dev it should transfer erc1155 from erc1155Vault contract to beneficiary
    function testFuzz_Withdraw_TransferNftOutAmountToBeneficiary(address beneficiary, uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        setUpWithdraw(beneficiary, outAmount);
        uint256 inAmount = outAmount * 10**18;
        uint256 previousBalance = erc1155.balanceOf(beneficiary, erc1155Vault.assetId());
        erc1155Vault.withdraw(inAmount, outAmount, beneficiary);
        uint256 actualBalance = erc1155.balanceOf(beneficiary, erc1155Vault.assetId());
        uint256 expectedBalance = previousBalance + outAmount;
        assertEq(actualBalance, expectedBalance, "transfer erc1155");
    }

    /// @dev it should emit Withdraw event.
    function testFuzz_Withdraw_Event(address beneficiary, uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        setUpWithdraw(beneficiary, outAmount);
        uint256 inAmount = outAmount * 10**18;
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Withdraw(inAmount, outAmount, beneficiary);
        erc1155Vault.withdraw(inAmount, outAmount, beneficiary);
    }
}
