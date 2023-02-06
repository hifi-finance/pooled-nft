// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { IPoolFactory } from "contracts/IPoolFactory.sol";
import { PoolFactoryTest } from "../PoolFactory.t.sol";

contract CreatePool_Test is PoolFactoryTest {
    modifier poolAlreadyExists() {
        poolFactory.createPool("JPEG Pool", "pJPEG", address(nft));
        _;
    }

    /// @dev it should revert.
    function test_RevertWhen_PoolAlreadyExists() external poolAlreadyExists {
        vm.expectRevert(IPoolFactory.PoolFactory__PoolAlreadyExists.selector);
        poolFactory.createPool("JPEG Pool", "pJPEG", address(nft));
    }

    /// @dev it should create pool.
    function testFuzz_CreatePool(address asset) external {
        poolFactory.createPool("JPEG Pool", "pJPEG", asset);
        assertTrue(poolFactory.pools(asset), "create pool");
    }

    /// @dev it should emit an CreatePool event.
    function testFuzz_CreatePool_Event(address asset) external {
        vm.expectEmit({ checkTopic1: true, checkTopic2: false, checkTopic3: false, checkData: true });
        // we are not checking topic 2
        // Checking topic 3 here doesn't matter, because `CreatePool` only has 2 indexed topics.
        emit CreatePool("JPEG Pool", "pJPEG", asset, address(0x0));
        poolFactory.createPool("JPEG Pool", "pJPEG", asset);
    }
}
