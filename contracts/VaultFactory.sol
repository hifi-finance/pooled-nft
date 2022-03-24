// SPDX-License-Identifier: TODO
pragma solidity >=0.8.4;

import "./IVaultFactory.sol";

/// @title VaultFactory
/// @author Hifi
contract VaultFactory is IVaultFactory {
    /// PUBLIC STORAGE ///

    /// INTERNAL STORAGE ///

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IVaultFactory
    function createVault(
        string calldata name,
        string calldata symbol,
        address asset
    ) external override {
        // TODO: implement
        emit CreateVault(name, symbol, asset);
    }
}
