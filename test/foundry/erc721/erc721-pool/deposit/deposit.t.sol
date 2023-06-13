// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";
import "forge-std/console.sol";

contract Deposit_Test is ERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_PoolIsFrozen(uint256 id, address beneficiary) external {
        erc721Pool.__godMode_setPoolFrozenStatus(true);
        vm.expectRevert(IERC721Pool.ERC721Pool__PoolFrozen.selector);
        erc721Pool.deposit(id, beneficiary);
    }

    /// @dev it should revert.
    function test_RevertWhen_BeneficiaryIsZeroAddress(uint256 id) external {
        address beneficiary = address(0);
        vm.expectRevert(IERC721Pool.ERC721Pool__ZeroAddress.selector);
        erc721Pool.deposit(id, beneficiary);
    }

    /// @dev it should revert.
    function test_RevertWhen_NFTAlredyPresentInPool(uint256 id, address beneficiary) external {
        vm.assume(beneficiary != address(0));
        uint256[] memory ids = new uint256[](1);
        ids[0] = id;
        erc721Pool.__godMode_setHoldings(ids);
        vm.expectRevert(abi.encodeWithSelector(IERC721Pool.ERC721Pool__NFTAlreadyInPool.selector, id));
        erc721Pool.deposit(ids[0], beneficiary);
    }

    /// @dev it should revert.
    function test_RevertWhen_NFTPoolTransferNotApproved(uint256 id) external {
        uint256[] memory ids = new uint256[](1);
        ids[0] = id;
        mintNft(users.alice, ids);
        changePrank(users.bob);
        vm.expectRevert("ERC721: caller is not token owner or approved");
        erc721Pool.deposit(id, users.alice);
    }

    /// @dev Common set up for deposit
    function setUpDeposit(uint256 id) internal {
        uint256[] memory ids = new uint256[](1);
        ids[0] = id;
        mintNft(users.alice, ids);
        nft.approve(address(erc721Pool), id);
    }

    /// @dev it should add given tokenIds to holdings.
    function testFuzz_Deposit_AddAssetTokenIdsToHoldings(uint256 id) external {
        setUpDeposit(id);
        erc721Pool.deposit(id, users.alice);
        assertEq(erc721Pool.holdingAt(0), id, "holding at");
    }

    /// @dev it should transfer nft from caller to erc721Pool contract.
    function testFuzz_Deposit_TransferNftFromBeneficiary(uint256 id) external {
        setUpDeposit(id);
        uint256 previousBalance = nft.balanceOf(address(erc721Pool));
        erc721Pool.deposit(id, users.bob);
        uint256 actualBalance = nft.balanceOf(address(erc721Pool));
        uint256 expectedBalance = previousBalance + 1;
        assertEq(actualBalance, expectedBalance, "transferFrom");
    }

    /// @dev it should transfer erc721Pool tokens to beneficiary.
    function testFuzz_Deposit_TransferPoolTokensToBeneficiary(uint256 id) external {
        setUpDeposit(id);
        uint256 previousBalance = erc721Pool.balanceOf(users.bob);
        erc721Pool.deposit(id, users.bob);
        uint256 actualBalance = erc721Pool.balanceOf(users.bob);
        uint256 expectedBalance = previousBalance + 10**18;
        assertEq(actualBalance, expectedBalance, "deposit pool tokens");
    }

    /// @dev it should emit Deposit event.
    function testFuzz_Deposit_Event(uint256 id) external {
        setUpDeposit(id);
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        emit Deposit(id, users.bob, users.alice);
        erc721Pool.deposit(id, users.bob);
    }
}
