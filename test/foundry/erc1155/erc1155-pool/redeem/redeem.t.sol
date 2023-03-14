// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC1155Pool } from "contracts/ERC-1155/IERC1155Pool.sol";
import { ERC1155Pool_Test } from "../ERC1155Pool.t.sol";

contract Redeem_Test is ERC1155Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_InAmountIsZero() external {
        uint256 outAmount = 0;
        vm.expectRevert(IERC1155Pool.ERC1155Pool__InsufficientIn.selector);
        erc1155Pool.redeem(outAmount * 10**18, outAmount, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_InOutMismatch() external {
        uint256 inAmount = 1;
        uint256 outAmount = 2;
        vm.expectRevert(IERC1155Pool.ERC1155Pool__InOutMismatch.selector);
        erc1155Pool.redeem(inAmount, outAmount, users.alice);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_BeneficiaryZeroAddress(uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        address beneficiary = address(0);
        vm.expectRevert(IERC1155Pool.ERC1155Pool__InvalidTo.selector);
        erc1155Pool.redeem(outAmount * 10**18, outAmount, beneficiary);
    }

    /// @dev Common set up for redeem
    function setUpRedeem(address beneficiary, uint256 outAmount) internal {
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(erc1155Pool));

        // mint erc1155 to erc1155Pool
        mintNft(address(erc1155Pool), erc1155Pool.assetId(), outAmount);
        // Mint erc1155Pool tokens so that we have what to burn.
        erc1155Pool.__godMode_mint(beneficiary, outAmount * 10**18);
        erc1155Pool.__godMode_setHoldings(outAmount);
        changePrank(beneficiary);
    }

    /// @dev it should burn outAmount * 10 ** 18 erc1155Pool tokens.
    function testFuzz_Redeem_BurnPoolTokens(address beneficiary, uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        setUpRedeem(beneficiary, outAmount);
        uint256 previousBalance = erc1155Pool.balanceOf(beneficiary);
        erc1155Pool.redeem(outAmount * 10**18, outAmount, beneficiary);
        uint256 actualBalance = erc1155Pool.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance - outAmount * 10**18;
        assertEq(actualBalance, expectedBalance, "burn erc1155Pool tokens");
    }

    /// @dev it should remove token outAmount from holdings.
    function testFuzz_Redeem_RemoveAssetOutAmountfromHoldings(address beneficiary, uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        setUpRedeem(beneficiary, outAmount);
        uint256 previousHoldings = erc1155Pool.holdings();
        erc1155Pool.redeem(outAmount * 10**18, outAmount, beneficiary);
        uint256 actualHoldings = erc1155Pool.holdings();
        uint256 expectedHoldings = previousHoldings - outAmount;
        assertEq(actualHoldings, expectedHoldings, "holding at");
    }

    /// @dev it should transfer erc1155 from erc1155Pool contract to beneficiary
    function testFuzz_Redeem_TransferNftOutAmountToBeneficiary(address beneficiary, uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        setUpRedeem(beneficiary, outAmount);
        uint256 previousBalance = erc1155.balanceOf(beneficiary, erc1155Pool.assetId());
        erc1155Pool.redeem(outAmount * 10**18, outAmount, beneficiary);
        uint256 actualBalance = erc1155.balanceOf(beneficiary, erc1155Pool.assetId());
        uint256 expectedBalance = previousBalance + outAmount;
        assertEq(actualBalance, expectedBalance, "transfer erc1155");
    }

    /// @dev it should emit Redeem event.
    function testFuzz_Redeem_Event(address beneficiary, uint256 outAmount) external {
        outAmount = bound(outAmount, 1, 10_000);
        setUpRedeem(beneficiary, outAmount);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        emit Redeem(outAmount * 10**18, outAmount, beneficiary);
        erc1155Pool.redeem(outAmount * 10**18, outAmount, beneficiary);
    }
}
