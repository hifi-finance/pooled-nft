// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721PoolFactory } from "contracts/ERC-721/IERC721PoolFactory.sol";
import { ERC721PoolFactory_Test } from "../ERC721PoolFactory.t.sol";

contract SetENSName_Test is ERC721PoolFactory_Test {
    /// @dev it should revert.
    function test_RevertWhen_CallerIsNotOwner(
        address asset,
        address registrar,
        string memory name
    ) external {
        vm.expectRevert("Ownable: caller is not the owner");
        erc721PoolFactory.setENSName(asset, registrar, name);
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

    function testFuzz_RevertWhen_RegistrarIsZeroAddress(string memory name) external callerIsOwner poolAlreadyExists {
        address registrar = address(0);
        vm.expectRevert(IERC721PoolFactory.ERC721PoolFactory__RegistrarZeroAddress.selector);
        erc721PoolFactory.setENSName(address(nft), registrar, name);
    }
}
