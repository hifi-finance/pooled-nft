// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { IPool } from "contracts/IPool.sol";
import { PoolTest } from "../Pool.t.sol";

contract Redeem_Test is PoolTest {
    /// @dev it should revert.
    function test_RevertWhen_PoolTokenInAmountIsZero() external {
        uint256 inAmount = 0;
        uint256[] memory outIds = new uint256[](1);
        outIds[0] = 1;
        vm.expectRevert(IPool.Pool__InsufficientIn.selector);
        pool.redeem(inAmount, outIds, users.alice);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_PoolTokenInOutMismatch(
        uint256 inAmount,
        uint256[] memory outIds,
        address beneficiary
    ) external {
        vm.assume(inAmount != 0);
        vm.assume(inAmount != outIds.length * 10**18);
        vm.expectRevert(IPool.Pool__InOutMismatch.selector);
        pool.redeem(inAmount, outIds, beneficiary);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_BeneficiaryZeroAddress(uint256[] memory outIds) external {
        vm.assume(outIds.length > 0);
        uint256 inAmount = outIds.length * 10**18;
        address beneficiary = address(0);
        vm.expectRevert(IPool.Pool__InvalidTo.selector);
        pool.redeem(inAmount, outIds, beneficiary);
    }

    /// @dev Common set up for redeem
    function setUpRedeem(address beneficiary, uint256[] memory outIds) internal {
        vm.assume(outIds.length != 0);
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(pool));

        //assume each inIds value is unique
        for (uint256 i = 0; i < outIds.length; i++) {
            for (uint256 j = i + 1; j < outIds.length; j++) {
                vm.assume(outIds[i] != outIds[j]);
            }
        }
        // mint nft to pool
        mintNft(address(pool), outIds);
        // Mint pool tokens so that we have what to burn.
        uint256 inAmount = outIds.length * 10**18;
        pool.__godMode_mint(beneficiary, inAmount);
        changePrank(beneficiary);
    }

    /// @dev it should burn pool token inAmount.
    function testFuzz_Redeem_BurnPoolTokenInAmount(address beneficiary, uint256[] memory outIds) external {
        setUpRedeem(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        uint256 previousBalance = pool.balanceOf(beneficiary);
        pool.redeem(inAmount, outIds, beneficiary);
        uint256 actualBalance = pool.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance - inAmount;
        assertEq(actualBalance, expectedBalance, "burn pool tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Redeem_RemoveAssetTokenIdsfromHoldings(address beneficiary, uint256[] memory outIds) external {
        setUpRedeem(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        pool.__godMode_setHoldings(outIds);
        uint256 previousHoldingsLength = pool.holdingsLength();
        pool.redeem(inAmount, outIds, beneficiary);
        uint256 actualHoldingsLength = pool.holdingsLength();
        uint256 expectedHoldingsLength = previousHoldingsLength - outIds.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should transfer nft from pool contract to beneficiary
    function testFuzz_Redeem_TransferNftOutIdsToBeneficiary(address beneficiary, uint256[] memory outIds) external {
        setUpRedeem(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        uint256 previousBalance = nft.balanceOf(beneficiary);
        pool.redeem(inAmount, outIds, beneficiary);
        uint256 actualBalance = nft.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance + outIds.length;
        assertEq(actualBalance, expectedBalance, "transfer nft");
    }

    /// @dev it should emit Redeem event.
    function testFuzz_Redeem_Event(address beneficiary, uint256[] memory outIds) external {
        setUpRedeem(beneficiary, outIds);
        uint256 inAmount = outIds.length * 10**18;
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Redeem(inAmount, outIds, beneficiary);
        pool.redeem(inAmount, outIds, beneficiary);
    }
}
