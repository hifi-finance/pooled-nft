// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "./Pool.sol";
import "./IPoolFactory.sol";

/// @title PoolFactory
/// @author Hifi
contract PoolFactory is IPoolFactory {
    /// @inheritdoc IPoolFactory
    mapping(address => bool) public override pools;

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IPoolFactory
    function createPool(
        string calldata name,
        string calldata symbol,
        address asset
    ) external override {
        if (pools[asset]) {
            revert PoolFactory__PoolAlreadyExists();
        }
        IPool pool = new Pool(name, symbol, asset);
        pools[asset] = true;
        emit CreatePool(name, symbol, asset, address(pool));
    }
}
