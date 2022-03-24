// SPDX-License-Identifier: TODO
pragma solidity >=0.8.4;

import "./IVault.sol";

/// @title Vault
/// @author Hifi
contract Vault is IVault {
    /// PUBLIC STORAGE ///

    /// @inheritdoc IVault
    address public override asset;

    /// INTERNAL STORAGE ///

    /// @dev Todo.
    uint256[] internal holdings;

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IVault
    function mint(uint256[] calldata inIds, address to) external override {
        // TODO: implement
        // TODO: check gas cost of including uint256[] in event.
        emit Mint(inIds, to);
    }

    /// @inheritdoc IVault
    function redeem(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to
    ) external override {
        // TODO: implement
        // TODO: check gas cost of including uint256[] in event.
        emit Redeem(inAmount, outIds, to);
    }

    /// @inheritdoc IVault
    function swap(
        uint256[] calldata inIds,
        uint256[] calldata outIds,
        address to
    ) external override {
        // TODO: implement
        // TODO: check gas cost of including uint256[] in event.
        emit Swap(inIds, outIds, to);
    }
}
