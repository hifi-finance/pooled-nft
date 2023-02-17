// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { IERC1155Pool } from "contracts/ERC-1155/IERC1155Pool.sol";
import { ERC1155Pool_Test } from "../ERC1155Pool.t.sol";

contract Mint_Test is ERC1155Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_InAmountIsZero() external {
        uint256 inAmount = 0;
        vm.expectRevert(IERC1155Pool.ERC1155Pool__InsufficientIn.selector);
        erc1155Pool.mint(inAmount, inAmount * 10**18, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_InOutMismatch() external {
        uint256 inAmount = 1;
        uint256 outAmount = 2;
        address beneficiary = users.alice;
        vm.expectRevert(IERC1155Pool.ERC1155Pool__InOutMismatch.selector);
        erc1155Pool.mint(inAmount, outAmount, beneficiary);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        address beneficiary = address(0);
        uint256 inAmount = 1;
        vm.expectRevert(IERC1155Pool.ERC1155Pool__InvalidTo.selector);
        erc1155Pool.mint(inAmount, inAmount * 10**18, beneficiary);
    }

    /// @dev Common set up for mint
    function setUpMint(address beneficiary, uint256 inAmount) internal {
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(erc1155Pool));
        mintNft(beneficiary, erc1155Pool.assetId(), inAmount);
        changePrank(beneficiary);
        erc1155.setApprovalForAll(address(erc1155Pool), true);
    }

    /// @dev it should add given tokenIds to holdings.
    function testFuzz_Mint_IncrementHoldingsByInAmount(address beneficiary, uint256 inAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        setUpMint(beneficiary, inAmount);
        uint256 previousHoldings = erc1155Pool.holdings();
        erc1155Pool.mint(inAmount, inAmount * 10**18, beneficiary);
        uint256 actualHoldings = erc1155Pool.holdings();
        uint256 expectedHoldings = previousHoldings + inAmount;
        assertEq(actualHoldings, expectedHoldings, "holdings");
    }

    /// @dev it should transfer erc1155 from msg.sender to erc1155Pool contract.
    function testFuzz_Mint_TransferNftFromSender(address beneficiary, uint256 inAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        setUpMint(beneficiary, inAmount);
        uint256 previousBalance = erc1155.balanceOf(address(erc1155Pool), erc1155Pool.assetId());
        console2.log(erc1155.balanceOf(beneficiary, 123));
        erc1155Pool.mint(inAmount, inAmount * 10**18, beneficiary);
        uint256 actualBalance = erc1155.balanceOf(address(erc1155Pool), erc1155Pool.assetId());
        uint256 expectedBalance = previousBalance + inAmount;
        assertEq(actualBalance, expectedBalance, "transferFrom");
    }

    /// @dev it should transfer erc1155Pool tokens to beneficiary.
    function testFuzz_Mint_TransferPoolTokensToBeneficiary(address beneficiary, uint256 inAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        setUpMint(beneficiary, inAmount);
        uint256 previousBalance = erc1155Pool.balanceOf(beneficiary);
        erc1155Pool.mint(inAmount, inAmount * 10**18, beneficiary);
        uint256 actualBalance = erc1155Pool.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance + inAmount * 10**18;
        assertEq(actualBalance, expectedBalance, "mint erc1155Pool tokens");
    }

    /// @dev it should emit Mint event.
    function testFuzz_Mint_Event(address beneficiary, uint256 inAmount) external {
        inAmount = bound(inAmount, 1, 10_000);
        setUpMint(beneficiary, inAmount);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        emit Mint(inAmount, inAmount * 10**18, beneficiary);
        erc1155Pool.mint(inAmount, inAmount * 10**18, beneficiary);
    }
}
