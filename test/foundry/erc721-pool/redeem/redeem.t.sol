// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";

contract Redeem_Test is ERC721Pool_Test {
    /// @dev it should revert.
    function testFuzz_RevertWhen_BeneficiaryZeroAddress(uint256[] memory outIds) external {
        vm.assume(outIds.length > 0);
        address beneficiary = address(0);
        vm.expectRevert(IERC721Pool.ERC721Pool__InvalidTo.selector);
        erc721Pool.redeem(outIds, beneficiary);
    }

    /// @dev Common set up for redeem
    function setUpRedeem(address beneficiary, uint256[] memory outIds) internal {
        vm.assume(outIds.length > 0);
        vm.assume(beneficiary != address(0));
        vm.assume(beneficiary != address(erc721Pool));

        //assume each inIds value is unique
        for (uint256 i = 0; i < outIds.length; i++) {
            for (uint256 j = i + 1; j < outIds.length; j++) {
                vm.assume(outIds[i] != outIds[j]);
            }
        }
        // mint nft to erc721Pool
        mintNft(address(erc721Pool), outIds);
        // Mint erc721Pool tokens so that we have what to burn.
        erc721Pool.__godMode_mint(beneficiary, outIds.length * 10**18);
        erc721Pool.__godMode_setHoldings(outIds);
        changePrank(beneficiary);
    }

    /// @dev it should burn outIds.length * 10 ** 18 erc721Pool tokens.
    function testFuzz_Redeem_BurnPoolTokens(address beneficiary, uint256[] memory outIds) external {
        setUpRedeem(beneficiary, outIds);
        uint256 previousBalance = erc721Pool.balanceOf(beneficiary);
        erc721Pool.redeem(outIds, beneficiary);
        uint256 actualBalance = erc721Pool.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance - outIds.length * 10**18;
        assertEq(actualBalance, expectedBalance, "burn erc721Pool tokens");
    }

    /// @dev it should remove tokenIds from holdings.
    function testFuzz_Redeem_RemoveAssetTokenIdsfromHoldings(address beneficiary, uint256[] memory outIds) external {
        setUpRedeem(beneficiary, outIds);
        uint256 previousHoldingsLength = erc721Pool.holdingsLength();
        erc721Pool.redeem(outIds, beneficiary);
        uint256 actualHoldingsLength = erc721Pool.holdingsLength();
        uint256 expectedHoldingsLength = previousHoldingsLength - outIds.length;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should transfer nft from erc721Pool contract to beneficiary
    function testFuzz_Redeem_TransferNftOutIdsToBeneficiary(address beneficiary, uint256[] memory outIds) external {
        setUpRedeem(beneficiary, outIds);
        uint256 previousBalance = nft.balanceOf(beneficiary);
        erc721Pool.redeem(outIds, beneficiary);
        uint256 actualBalance = nft.balanceOf(beneficiary);
        uint256 expectedBalance = previousBalance + outIds.length;
        assertEq(actualBalance, expectedBalance, "transfer nft");
    }

    /// @dev it should emit Redeem event.
    function testFuzz_Redeem_Event(address beneficiary, uint256[] memory outIds) external {
        setUpRedeem(beneficiary, outIds);
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        emit Redeem(outIds, beneficiary);
        erc721Pool.redeem(outIds, beneficiary);
    }
}
