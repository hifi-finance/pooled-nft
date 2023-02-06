// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;
import { IPool } from "contracts/IPool.sol";
import { PoolTest } from "../Pool.t.sol";

contract Mint_Test is PoolTest {
    /// @dev it should revert.
    function test_RevertWhen_InIdsIsEmpty() external {
        uint256[] memory inIds;
        vm.expectRevert(IPool.Pool__InsufficientIn.selector);
        pool.mint(inIds, 1, users.alice);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_InOutMismatch(uint256[] memory inIds, uint256 outAmount) external {
        vm.assume(inIds.length > 0);
        vm.assume(inIds.length * 10**18 != outAmount);
        vm.expectRevert(IPool.Pool__InOutMismatch.selector);
        pool.mint(inIds, outAmount, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        address beneficiary = address(0);
        uint256[] memory inIds = new uint256[](1);
        inIds[0] = 1;
        uint256 outAmount = inIds.length * 10**18;
        vm.expectRevert(IPool.Pool__InvalidTo.selector);
        pool.mint(inIds, outAmount, beneficiary);
    }

    /// @dev it should add given tokenIds to holdings.
    function testFuzz_Mint_AddAssetTokenIdsToHoldings(address beneficiary, uint256[] memory inIds) external {
        checkAssumptions(beneficiary, inIds);
        mintPoolTokens(beneficiary, inIds);
        for (uint256 i; i < inIds.length; ++i) {
            assertEq(pool.holdingAt(i), inIds[i], "holding at");
        }
    }

    /// @dev it should transfer nft from msg.sender to pool contract.
    function testFuzz_Mint_TransferNftFromSender(address beneficiary, uint256[] memory inIds) external {
        vm.assume(beneficiary != address(pool));
        checkAssumptions(beneficiary, inIds);
        uint256 previousBalance = nft.balanceOf(address(pool));
        mintPoolTokens(beneficiary, inIds);
        uint256 actualBalance = nft.balanceOf(address(pool));
        uint256 expectedBalance = previousBalance + inIds.length;
        assertEq(actualBalance, expectedBalance, "transferFrom");
    }

    /// @dev it should transfer pool tokens to beneficiary.
    function testFuzz_Mint_TransferPoolTokensToBeneficiary(address beneficiary, uint256[] memory inIds) external {
        checkAssumptions(beneficiary, inIds);
        uint256 previousBalance = pool.balanceOf(beneficiary);
        mintPoolTokens(beneficiary, inIds);
        uint256 actualBalance = pool.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance + inIds.length * 10**18;
        assertEq(actualBalance, expectedBalance, "mint pool tokens");
    }

    /// @dev it should emit Mint event.
    function testFuzz_Mint_Event(address beneficiary, uint256[] memory inIds) external {
        checkAssumptions(beneficiary, inIds);
        mintNft(beneficiary, inIds);
        uint256 outAmount = inIds.length * 10**18;
        changePrank(beneficiary);
        nft.setApprovalForAll(address(pool), true);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Mint(inIds, outAmount, users.alice);
        pool.mint(inIds, outAmount, users.alice);
    }
}
