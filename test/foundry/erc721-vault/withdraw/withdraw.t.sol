// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Vault } from "contracts/ERC-721/IERC721Vault.sol";
import { ERC721Vault_Test } from "../ERC721Vault.t.sol";

contract Withdraw_Test is ERC721Vault_Test {
    /// @dev it should revert.
    function test_RevertWhen_VaultTokenInAmountIsZero() external {
        uint256 inAmount = 0;
        uint256[] memory outIds = new uint256[](1);
        outIds[0] = 1;
        vm.expectRevert(IERC721Vault.ERC721Vault__InsufficientIn.selector);
        erc721Vault.withdraw(inAmount, outIds, users.alice);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_VaultTokenInOutMismatch(uint256[] memory outIds) external {
        uint256 inAmount = 1;
        vm.expectRevert(IERC721Vault.ERC721Vault__InOutMismatch.selector);
        erc721Vault.withdraw(inAmount, outIds, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        address beneficiary = address(0);
        uint256[] memory outIds = new uint256[](1);
        outIds[0] = 1;
        uint256 inAmount = outIds.length * 10**18;
        vm.expectRevert(IERC721Vault.ERC721Vault__InvalidTo.selector);
        erc721Vault.withdraw(inAmount, outIds, beneficiary);
    }

    /// @dev Common set up for redeem
    function setUpWithdraw(address beneficiary, uint256[] memory outIds) internal {
        vm.assume(outIds.length != 0);
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(erc721Vault));

        //assume each inIds value is unique
        for (uint256 i = 0; i < outIds.length; i++) {
            for (uint256 j = i + 1; j < outIds.length; j++) {
                vm.assume(outIds[i] != outIds[j]);
            }
        }
        // mint nft to erc721Vault
        mintNft(address(erc721Vault), outIds);
        // Mint erc721Vault tokens so that we have what to burn.
        uint256 inAmount = outIds.length * 10**18;
        erc721Vault.__godMode_mint(beneficiary, inAmount);
        erc721Vault.__godMode_setHoldings(beneficiary, outIds);
        changePrank(beneficiary);
    }

    /// @dev it should burn erc721Vault token inAmount.
    function testFuzz_Withdraw_BurnVaultTokenInAmount(address beneficiary, uint256[] memory outIds) external {
        setUpWithdraw(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        uint256 previousBalance = erc721Vault.balanceOf(beneficiary);
        erc721Vault.withdraw(inAmount, outIds, beneficiary);
        uint256 actualBalance = erc721Vault.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance - inAmount;
        assertEq(actualBalance, expectedBalance, "burn erc721Vault tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Withdraw_RemoveAssetTokenIdsfromHoldings(address beneficiary, uint256[] memory outIds) external {
        setUpWithdraw(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        uint256 previousHoldingsLength = erc721Vault.holdingsLength(beneficiary);
        erc721Vault.withdraw(inAmount, outIds, beneficiary);
        uint256 actualHoldingsLength = erc721Vault.holdingsLength(beneficiary);
        uint256 expectedHoldingsLength = previousHoldingsLength - outIds.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should transfer nft from erc721Vault contract to beneficiary
    function testFuzz_Withdraw_TransferNftOutIdsToBeneficiary(address beneficiary, uint256[] memory outIds) external {
        setUpWithdraw(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        uint256 previousBalance = nft.balanceOf(beneficiary);
        erc721Vault.withdraw(inAmount, outIds, beneficiary);
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
        erc721Vault.withdraw(inAmount, outIds, beneficiary);
    }
}
