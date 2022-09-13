// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "./Pool.sol";
import "./IPoolFactory.sol";

/// @title PoolFactory
/// @author Hifi
contract PoolFactory is IPoolFactory {
    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IPoolFactory
    function createPool(
        string calldata name,
        string calldata symbol,
        address asset
    ) external override {
        IPool pool = new Pool(name, symbol, asset);
        emit CreatePool(name, symbol, asset, address(pool));
    }
}
