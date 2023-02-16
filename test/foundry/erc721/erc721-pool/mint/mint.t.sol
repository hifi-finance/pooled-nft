// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";

contract Mint_Test is ERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_InIdsIsEmpty() external {
        uint256[] memory inIds;
        vm.expectRevert(IERC721Pool.ERC721Pool__InsufficientIn.selector);
        erc721Pool.mint(inIds, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryZeroAddress() external {
        address beneficiary = address(0);
        uint256[] memory inIds = new uint256[](1);
        inIds[0] = 1;
        vm.expectRevert(IERC721Pool.ERC721Pool__InvalidTo.selector);
        erc721Pool.mint(inIds, beneficiary);
    }

    /// @dev Common set up for mint
    function setUpMint(address beneficiary, uint256[] memory inIds) internal {
        vm.assume(inIds.length != 0);
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(erc721Pool));
        //assume each inIds value is unique
        for (uint256 i = 0; i < inIds.length; i++) {
            for (uint256 j = i + 1; j < inIds.length; j++) {
                vm.assume(inIds[i] != inIds[j]);
            }
        }
        mintNft(beneficiary, inIds);
        changePrank(beneficiary);
        nft.setApprovalForAll(address(erc721Pool), true);
    }

    /// @dev it should add given tokenIds to holdings.
    function testFuzz_Mint_AddAssetTokenIdsToHoldings(address beneficiary, uint256[] memory inIds) external {
        setUpMint(beneficiary, inIds);
        erc721Pool.mint(inIds, beneficiary);
        for (uint256 i; i < inIds.length; ++i) {
            assertEq(erc721Pool.holdingAt(i), inIds[i], "holding at");
        }
    }

    /// @dev it should transfer nft from msg.sender to erc721Pool contract.
    function testFuzz_Mint_TransferNftFromSender(address beneficiary, uint256[] memory inIds) external {
        setUpMint(beneficiary, inIds);
        uint256 previousBalance = nft.balanceOf(address(erc721Pool));
        erc721Pool.mint(inIds, beneficiary);
        uint256 actualBalance = nft.balanceOf(address(erc721Pool));
        uint256 expectedBalance = previousBalance + inIds.length;
        assertEq(actualBalance, expectedBalance, "transferFrom");
    }

    /// @dev it should transfer erc721Pool tokens to beneficiary.
    function testFuzz_Mint_TransferPoolTokensToBeneficiary(address beneficiary, uint256[] memory inIds) external {
        setUpMint(beneficiary, inIds);
        uint256 previousBalance = erc721Pool.balanceOf(beneficiary);
        erc721Pool.mint(inIds, beneficiary);
        uint256 actualBalance = erc721Pool.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance + inIds.length * 10**18;
        assertEq(actualBalance, expectedBalance, "mint erc721Pool tokens");
    }

    /// @dev it should emit Mint event.
    function testFuzz_Mint_Event(address beneficiary, uint256[] memory inIds) external {
        setUpMint(beneficiary, inIds);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Mint(inIds, beneficiary);
        erc721Pool.mint(inIds, beneficiary);
    }
}
