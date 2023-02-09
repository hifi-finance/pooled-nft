// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import "./ERC721Vault.sol";
import "./IERC721VaultFactory.sol";

/// @title ERC721VaultFactory
/// @author Hifi
contract ERC721VaultFactory is IERC721VaultFactory {
    /// PUBLIC STORAGE ///

    /// @inheritdoc IERC721VaultFactory
    mapping(address => address) public override getVault;

    /// @inheritdoc IERC721VaultFactory
    address[] public allVaults;

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC721VaultFactory
    function allVaultsLength() external view override returns (uint256) {
        return allVaults.length;
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC721VaultFactory
    function createVault(address asset) external override {
        if (!IERC721(asset).supportsInterface(type(IERC721Metadata).interfaceId)) {
            revert ERC721VaultFactory__DoesNotImplementIERC721Metadata();
        }
        if (getVault[asset] != address(0)) {
            revert ERC721VaultFactory__VaultAlreadyExists();
        }

        string memory name = string.concat(IERC721Metadata(asset).name(), " Vaulted");
        string memory symbol = string.concat(IERC721Metadata(asset).symbol(), "v");

        bytes32 salt = keccak256(abi.encodePacked(asset));
        ERC721Vault vault = new ERC721Vault{ salt: salt }();
        vault.initialize(name, symbol, asset);

        getVault[asset] = address(vault);
        allVaults.push(address(vault));

        emit CreateVault(name, symbol, asset, address(vault));
    }
}
