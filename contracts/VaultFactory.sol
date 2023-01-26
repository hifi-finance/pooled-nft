// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "./Vault.sol";
import "./IVaultFactory.sol";

/// @title VaultFactory
/// @author Hifi
contract VaultFactory is IVaultFactory {
    /// @inheritdoc IVaultFactory
    mapping(address => bool) public override vaults;

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IVaultFactory
    function createVault(
        string calldata name,
        string calldata symbol,
        address asset
    ) external override {
        if (vaults[asset]) {
            revert Vault__VaultAlreadyExists();
        }
        IVault vault = new Vault(name, symbol, asset);
        vaults[asset] = true;
        emit CreateVault(name, symbol, asset, address(vault));
    }
}
