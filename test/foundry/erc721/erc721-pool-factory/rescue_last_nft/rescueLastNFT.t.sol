// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721PoolFactory } from "contracts/ERC-721/IERC721PoolFactory.sol";
import { ERC721PoolFactory_Test } from "../ERC721PoolFactory.t.sol";
import { ERC721Pool } from "contracts/ERC-721/ERC721Pool.sol";
import "forge-std/console2.sol";

contract RescueLastNFT_Test is ERC721PoolFactory_Test {
    /// @dev it should revert.
    function test_RevertWhen_CallerIsNotOwner() external {
        vm.expectRevert("Ownable: caller is not the owner");
        erc721PoolFactory.rescueLastNFT(address(nft), users.alice);
    }

    modifier callerIsOwner() {
        changePrank(erc721PoolFactory.owner());
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_PoolDoesNotExists() external callerIsOwner {
        vm.expectRevert(IERC721PoolFactory.ERC721PoolFactory__PoolDoesNotExist.selector);
        erc721PoolFactory.rescueLastNFT(address(nft), users.admin);
    }

    modifier poolAlreadyExists() {
        erc721PoolFactory.createPool(address(nft));
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_RecipientZeroAddress() external callerIsOwner poolAlreadyExists {
        vm.expectRevert();
        address to = address(0);
        erc721PoolFactory.rescueLastNFT(address(nft), to);
    }

    function setUpRescueLastNFT(uint256 id) internal {
        changePrank(users.alice);
        uint256[] memory ids = new uint256[](1);
        ids[0] = id;
        ERC721Pool pool = ERC721Pool(erc721PoolFactory.getPool(address(nft)));
        nft.__godMode_mint(users.alice, id);
        nft.setApprovalForAll(address(pool), true);
        pool.deposit(id, users.alice);
        changePrank(erc721PoolFactory.owner());
    }

    /// @dev it should delete pool.
    function testFuzz_RescueLastNFT_RemoveAssetPoolFromGetPool(uint256 id) external callerIsOwner poolAlreadyExists {
        setUpRescueLastNFT(id);
        erc721PoolFactory.rescueLastNFT(address(nft), users.admin);
        assertTrue(erc721PoolFactory.getPool(address(nft)) == address(0), "delete pool");
    }
}
