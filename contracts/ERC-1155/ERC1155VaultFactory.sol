// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./ERC1155Vault.sol";
import "./IERC1155VaultFactory.sol";

/// @title ERC1155VaultFactory
/// @author Hifi
contract ERC1155VaultFactory is IERC1155VaultFactory, Ownable {
    /// PUBLIC STORAGE ///

    /// @inheritdoc IERC1155VaultFactory
    mapping(address => mapping(uint256 => address)) public override getVault;

    /// @inheritdoc IERC1155VaultFactory
    address[] public allVaults;

    /// CONSTRUCTOR ///

    constructor() Ownable() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC1155VaultFactory
    function allVaultsLength() external view override returns (uint256) {
        return allVaults.length;
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC1155VaultFactory
    function createVault(address asset, uint256 assetId) external override {
        if (!IERC165(asset).supportsInterface(type(IERC1155).interfaceId)) {
            revert ERC1155VaultFactory__DoesNotImplementIERC1155();
        }
        if (getVault[asset][assetId] != address(0)) {
            revert ERC1155VaultFactory__VaultAlreadyExists();
        }

        bytes32 salt = keccak256(abi.encodePacked(asset, assetId));
        ERC1155Vault vault = new ERC1155Vault{ salt: salt }();
        vault.initialize(asset, assetId);

        getVault[asset][assetId] = address(vault);
        allVaults.push(address(vault));

        emit CreateVault(asset, assetId, address(vault));
    }
}
