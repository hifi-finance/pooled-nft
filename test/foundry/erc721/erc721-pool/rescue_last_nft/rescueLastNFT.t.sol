// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";
import "forge-std/console2.sol";

contract RescueLastNFT_Test is ERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_CallerNotFactory() external {
        vm.expectRevert(
            abi.encodeWithSelector(IERC721Pool.ERC721Pool__CallerNotFactory.selector, erc721Pool.factory(), users.alice)
        );
        erc721Pool.rescueLastNFT(users.admin);
    }

    modifier onlyFactory() {
        changePrank(erc721Pool.factory());
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_HoldingsLengthNotEqualOne() external onlyFactory {
        vm.expectRevert(IERC721Pool.ERC721Pool__MustContainExactlyOneNFT.selector);
        erc721Pool.rescueLastNFT(users.admin);
    }

    /// @dev Common set up for rescueLastNFT tests.
    function setUpRescueLastNFT(uint256 id) internal {
        uint256[] memory ids = new uint256[](1);
        ids[0] = id;
        erc721Pool.__godMode_setHoldings(ids);
        mintNft(address(erc721Pool), ids);
    }

    /// @dev it should add given tokenIds to holdings.
    function testFuzz_RescueLastNFT_RemoveAssetTokenIdsToHoldings(uint256 id) external onlyFactory {
        setUpRescueLastNFT(id);
        uint256 previousHoldingsLength = erc721Pool.holdingsLength();
        erc721Pool.rescueLastNFT(users.admin);
        assertEq(previousHoldingsLength, 1, "previous holdings length");
        uint256 actualHoldingsLength = erc721Pool.holdingsLength();
        uint256 expectedHoldingsLength = previousHoldingsLength - 1;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holdings length");
    }

    /// @dev it should transfer nft from erc721Pool contract to beneficiary
    function testFuzz_RescueLastNFT_TransferLastNftIdToBeneficiary(uint256 id) external onlyFactory {
        setUpRescueLastNFT(id);
        uint256 previousBalance = nft.balanceOf(users.admin);
        uint256 previousErc721PoolBalance = nft.balanceOf(address(erc721Pool));
        erc721Pool.rescueLastNFT(users.admin);
        uint256 actualBalance = nft.balanceOf(users.admin);
        uint256 actualErc721PoolBalance = nft.balanceOf(address(erc721Pool));
        uint256 expectedBalance = previousBalance + 1;
        uint256 expectedErc721PoolBalance = 0;
        assertEq(actualBalance, expectedBalance, "transfer NFT to admin");
        assertEq(previousErc721PoolBalance, 1, "previous erc721Pool balance");
        assertEq(actualErc721PoolBalance, expectedErc721PoolBalance, "transfer last NFT from erc721Pool");
    }

    /// @dev it should Freeze pool.
    function testFuzz_RescueLastNFT_FreezePool(uint256 id) external onlyFactory {
        setUpRescueLastNFT(id);
        bool previousFreezeStatus = erc721Pool.poolFrozen();
        assertEq(previousFreezeStatus, false, "previous freeze status");
        erc721Pool.rescueLastNFT(users.admin);
        bool actualFreezeStatus = erc721Pool.poolFrozen();
        assertEq(actualFreezeStatus, true, "freeze status");
    }

    /// @dev it should emit PoolFrozen event.
    function testFuzz_RescueLastNFT_Eventbla(uint256 id) external onlyFactory {
        setUpRescueLastNFT(id);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        emit RescueLastNFT(id, users.admin);
        erc721Pool.rescueLastNFT(users.admin);
    }
}
