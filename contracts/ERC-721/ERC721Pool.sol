// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IERC721Pool.sol";

import "./ERC20Wnft.sol";

/// @title ERC721Pool
/// @author Hifi
contract ERC721Pool is IERC721Pool, ERC20Wnft {
    using EnumerableSet for EnumerableSet.UintSet;
    /// INTERNAL STORAGE ///

    /// @dev The asset token IDs held in the pool.
    EnumerableSet.UintSet internal holdings;

    /// CONSTRUCTOR ///

    constructor() ERC20Wnft() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC721Pool
    function holdingAt(uint256 index) external view override returns (uint256) {
        return holdings.at(index);
    }

    /// @inheritdoc IERC721Pool
    function holdingsLength() external view override returns (uint256) {
        return holdings.length();
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC721Pool
    function mint(uint256[] calldata inIds, address to) external override {
        if (inIds.length == 0) {
            revert ERC721Pool__InsufficientIn();
        }
        if (to == address(0)) {
            revert ERC721Pool__InvalidTo();
        }
        for (uint256 i; i < inIds.length; ) {
            uint256 inId = inIds[i];
            require(holdings.add(inId));
            IERC721(asset).transferFrom(msg.sender, address(this), inId);
            unchecked {
                ++i;
            }
        }
        _mint(to, inIds.length * 10**18);
        emit Mint(inIds, to);
    }

    /// @inheritdoc IERC721Pool
    function redeem(uint256[] calldata outIds, address to) public override {
        if (to == address(0)) {
            revert ERC721Pool__InvalidTo();
        }
        _burn(msg.sender, outIds.length * 10**18);
        for (uint256 i; i < outIds.length; ) {
            uint256 outId = outIds[i];
            require(holdings.remove(outId));
            IERC721(asset).transferFrom(address(this), to, outId);
            unchecked {
                ++i;
            }
        }
        emit Redeem(outIds, to);
    }

    /// @inheritdoc IERC721Pool
    function redeemWithSignature(
        uint256[] calldata outIds,
        address to,
        uint256 deadline,
        bytes memory signature
    ) external override {
        permitInternal(outIds.length * 10**18, deadline, signature);
        redeem(outIds, to);
    }
}
