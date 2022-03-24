// SPDX-License-Identifier: TODO
pragma solidity >=0.8.4;

import "./Vault.sol";
import "./IVaultFactory.sol";

/// @title VaultFactory
/// @author Hifi
contract VaultFactory is IVaultFactory {
    /// PUBLIC STORAGE ///

    /// INTERNAL STORAGE ///

    constructor() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IVaultFactory
    function createVault(
        string calldata name,
        string calldata symbol,
        address asset
    ) external override {
        IVault vault = new Vault(name, symbol, asset);
        emit CreateVault(name, symbol, asset, address(vault));
    }
}
