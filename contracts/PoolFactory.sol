// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import "./Pool.sol";
import "./IPoolFactory.sol";

/// @title PoolFactory
/// @author Hifi
contract PoolFactory is IPoolFactory {
    /// PUBLIC STORAGE ///

    /// @inheritdoc IPoolFactory
    mapping(address => address) public override getPool;

    /// @inheritdoc IPoolFactory
    address[] public allPools;

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IPoolFactory
    function allPoolsLength() external view override returns (uint256) {
        return allPools.length;
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IPoolFactory
    function createPool(address asset) external override {
        if (!IERC721(asset).supportsInterface(type(IERC721Metadata).interfaceId)) {
            revert PoolFactory__DoesNotImplementIERC721Metadata();
        }
        if (getPool[asset] != address(0)) {
            revert PoolFactory__PoolAlreadyExists();
        }

        string memory name = string.concat(IERC721Metadata(asset).name(), " Pooled");
        string memory symbol = string.concat(IERC721Metadata(asset).symbol(), "p");

        bytes32 salt = keccak256(abi.encodePacked(asset));
        Pool pool = new Pool{ salt: salt }();
        pool.initialize(name, symbol, asset);

        getPool[asset] = address(pool);
        allPools.push(asset);

        emit CreatePool(name, symbol, asset, address(pool));
    }
}
