// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import "./Pool.sol";
import "./IPoolFactory.sol";

/// @title PoolFactory
/// @author Hifi
contract PoolFactory is IPoolFactory {
    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IPoolFactory
    function createPool(address asset) external override {
        if (!IERC721(asset).supportsInterface(type(IERC721Metadata).interfaceId)) {
            revert PoolFactory__DoesNotImplementIERC721Metadata();
        }

        string memory name = string.concat(IERC721Metadata(asset).name(), " Pooled");
        string memory symbol = string.concat(IERC721Metadata(asset).symbol(), "p");
        IPool pool = new Pool(name, symbol, asset);

        emit CreatePool(name, symbol, asset, address(pool));
    }
}
