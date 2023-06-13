// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IERC721Pool } from "contracts/ERC-721/IERC721Pool.sol";
import { ERC721Pool_Test } from "../ERC721Pool.t.sol";

contract SetENSName_Test is ERC721Pool_Test {
    /// @dev it should revert.
    function test_RevertWhen_CallerIsNotFactory(address registrar, string memory name) external {
        vm.expectRevert(
            abi.encodeWithSelector(IERC721Pool.ERC721Pool__CallerNotFactory.selector, erc721Pool.factory(), users.alice)
        );
        erc721Pool.setENSName(registrar, name);
    }

    modifier CallerIsFactory() {
        changePrank(erc721Pool.factory());
        _;
    }

    // @dev it should return reverse node hash.
    function testFuzz_SetENSName_ReturnNodeHash(string memory name) external CallerIsFactory {
        bytes32 nodeHash = erc721Pool.setENSName(address(reverseRegistrar), name);
        bytes32 reverseNode = reverseRegistrar.node(address(erc721Pool));
        assertEq(nodeHash, reverseNode, "reverse node hash");
    }

    /// @dev it should emit ReverseClaimed event.
    function testFuzz_ReverseClaimed_Event(string memory name) external CallerIsFactory {
        vm.expectEmit({ checkTopic1: true, checkTopic2: true, checkTopic3: true, checkData: true });
        bytes32 nodeHash = erc721Pool.setENSName(address(reverseRegistrar), name);
        emit ReverseClaimed(address(reverseRegistrar), nodeHash);
        erc721Pool.setENSName(address(reverseRegistrar), name);
    }
}
