// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;
import "forge-std/console2.sol";
import { IPool } from "contracts/IPool.sol";
import { PoolTest } from "../Pool.t.sol";

contract Swap_Test is PoolTest {
    /// @dev it should revert.
    function test_RevertWhen_InIdsEmpty() external {
        uint256[] memory inIds;
        uint256[] memory outIds = new uint256[](1);
        outIds[0] = 1;
        vm.expectRevert(IPool.Pool__InsufficientIn.selector);
        pool.swap(inIds, outIds, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        uint256[] memory inIds = new uint256[](1);
        inIds[0] = 1;
        uint256[] memory outIds = new uint256[](1);
        outIds[0] = 2;
        address beneficiary = address(0);
        vm.expectRevert(IPool.Pool__InvalidTo.selector);
        pool.swap(inIds, outIds, beneficiary);
    }

    /// @dev it should revert.
    function testFuzz_RevertWhen_InOutIdsLengthMismatch(
        uint256[] memory inIds,
        uint256[] memory outIds,
        address beneficiary
    ) external {
        vm.assume(inIds.length > 0 && outIds.length > 0);
        vm.assume(inIds.length != outIds.length);
        vm.expectRevert(IPool.Pool__InOutMismatch.selector);
        pool.swap(inIds, outIds, beneficiary);
    }

    /// @dev it should swap inIds for outIds.

    function testFuzz_Swap(address beneficiary) external {
        vm.assume(beneficiary != address(0));
        uint256[] memory outIds = new uint256[](2);
        outIds[0] = 1;
        outIds[1] = 2;
        mintPoolTokens(beneficiary, outIds);
        changePrank(beneficiary);
        uint256[] memory inIds = new uint256[](2);
        inIds[0] = 3;
        inIds[1] = 4;
        mintNft(beneficiary, inIds);
        nft.setApprovalForAll(address(pool), true);
        address expectedOwnerOfOutIds = beneficiary;
        address expectedOwnerOfInIds = address(pool);
        pool.swap(inIds, outIds, beneficiary);

        for (uint256 i = 0; i < inIds.length; i++) {
            address actualOwnerOfInIds = nft.ownerOf(inIds[i]);
            address actualOwnerOfOutIds = nft.ownerOf(outIds[i]);
            assertEq(actualOwnerOfInIds, expectedOwnerOfInIds, "inIds owner");
            assertEq(actualOwnerOfOutIds, expectedOwnerOfOutIds, "outIds owner");
        }
    }

    /// @dev it should emit Swap event.

    function testFuzz_Swap_Event(address beneficiary) external {
        vm.assume(beneficiary != address(0));
        uint256[] memory outIds = new uint256[](2);
        outIds[0] = 1;
        outIds[1] = 2;
        mintPoolTokens(beneficiary, outIds);
        changePrank(beneficiary);
        uint256[] memory inIds = new uint256[](2);
        inIds[0] = 3;
        inIds[1] = 4;
        mintNft(beneficiary, inIds);
        nft.setApprovalForAll(address(pool), true);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Swap(inIds, outIds, beneficiary);
        pool.swap(inIds, outIds, beneficiary);
    }
}
