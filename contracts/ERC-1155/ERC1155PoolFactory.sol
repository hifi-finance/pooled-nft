// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./ERC1155Pool.sol";
import "./IERC1155PoolFactory.sol";

/// @title ERC1155PoolFactory
/// @author Hifi
contract ERC1155PoolFactory is IERC1155PoolFactory, Ownable {
    /// PUBLIC STORAGE ///

    /// @inheritdoc IERC1155PoolFactory
    mapping(address => mapping(uint256 => address)) public override getPool;

    /// @inheritdoc IERC1155PoolFactory
    address[] public allPools;

    /// CONSTRUCTOR ///

    constructor() Ownable() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC1155PoolFactory
    function allPoolsLength() external view override returns (uint256) {
        return allPools.length;
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC1155PoolFactory
    function createPool(address asset, uint256 assetId) external override {
        if (!IERC165(asset).supportsInterface(type(IERC1155).interfaceId)) {
            revert ERC1155PoolFactory__DoesNotImplementIERC1155();
        }
        if (getPool[asset][assetId] != address(0)) {
            revert ERC1155PoolFactory__PoolAlreadyExists();
        }

        bytes32 salt = keccak256(abi.encodePacked(asset, assetId));
        ERC1155Pool pool = new ERC1155Pool{ salt: salt }();
        pool.initialize(asset, assetId);

        getPool[asset][assetId] = address(pool);
        allPools.push(address(pool));

        emit CreatePool(asset, assetId, address(pool));
    }
}
