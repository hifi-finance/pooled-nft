// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";

contract Withdraw_Test is ERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_NFTNotFoundInPool() external {
        uint256 id;
        vm.expectRevert(abi.encodeWithSelector(IERC721Pool.ERC721Pool__NFTNotFoundInPool.selector, id));
        erc721Pool.withdraw(id, users.alice);
    }

    /// @dev it should revert.
    function test_RevertWhen_PoolIsFrozen(uint256 id) external {
        erc721Pool.__godMode_setPoolFrozenStatus(true);
        vm.expectRevert(IERC721Pool.ERC721Pool__PoolFrozen.selector);
        erc721Pool.withdraw(id, users.alice);
    }

    /// @dev Common set up for withdraw
    function setUpWithdraw(uint256 id) internal {
        uint256[] memory ids = new uint256[](1);
        ids[0] = id;
        mintNft(address(erc721Pool), ids);
        erc721Pool.__godMode_mint(users.bob, 10**18);
        erc721Pool.__godMode_setHoldings(ids);
        changePrank(users.bob);
    }

    /// @dev it should remove ID from holdings.
    function testFuzz_Withdraw_RemoveAssetIdFromHoldings(uint256 id) external {
        setUpWithdraw(id);
        uint256 previousHoldingsLength = erc721Pool.holdingsLength();
        erc721Pool.withdraw(id, users.alice);
        uint256 actualHoldingsLength = erc721Pool.holdingsLength();
        uint256 expectedHoldingsLength = previousHoldingsLength - 1;
        assertEq(actualHoldingsLength, expectedHoldingsLength, "holding at");
    }

    /// @dev it should burn 10 ** 18 pool tokens from caller (i.e msg.sender).
    function testFuzz_Withdraw_BurnPoolTokens(uint256 id) external {
        setUpWithdraw(id);
        uint256 previousBalance = erc721Pool.balanceOf(users.bob);
        erc721Pool.withdraw(id, users.alice);
        uint256 actualBalance = erc721Pool.balanceOf(users.bob);
        uint256 expectedBalance = previousBalance - 10**18;
        assertEq(actualBalance, expectedBalance, "burn callers pool tokens");
    }

    /// @dev it should transfer nft from pool contract to beneficiary.
    function testFuzz_Withdraw_TransferNftToBeneficiary(uint256 id) external {
        setUpWithdraw(id);
        uint256 previousBalance = nft.balanceOf(users.alice);
        erc721Pool.withdraw(id, users.alice);
        uint256 actualBalance = nft.balanceOf(users.alice);
        uint256 expectedBalance = previousBalance + 1;
        assertEq(actualBalance, expectedBalance, "transfer nft to beneficiary");
    }

    /// @dev it should emit Withdraw event.
    function testFuzz_Withdraw_Event(uint256 id) external {
        setUpWithdraw(id);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        emit Withdraw(id, users.alice, users.bob);
        erc721Pool.withdraw(id, users.alice);
    }
}
