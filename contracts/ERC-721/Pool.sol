// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IPool.sol";

import "./ERC20Wnft.sol";

/// @title Pool
/// @author Hifi
contract Pool is IPool, ERC20Wnft {
    using EnumerableSet for EnumerableSet.UintSet;
    /// INTERNAL STORAGE ///

    /// @dev The asset token IDs held in the pool.
    EnumerableSet.UintSet internal holdings;

    /// CONSTRUCTOR ///

    constructor() ERC20Wnft() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IPool
    function holdingAt(uint256 index) external view override returns (uint256) {
        return holdings.at(index);
    }

    /// @inheritdoc IPool
    function holdingsLength() external view override returns (uint256) {
        return holdings.length();
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IPool
    function mint(
        uint256[] calldata inIds,
        uint256 outAmount,
        address to
    ) external override {
        if (inIds.length == 0) {
            revert Pool__InsufficientIn();
        }
        if (inIds.length * 10**18 != outAmount) {
            revert Pool__InOutMismatch();
        }
        if (to == address(0)) {
            revert Pool__InvalidTo();
        }
        for (uint256 i; i < inIds.length; ) {
            uint256 inId = inIds[i];
            holdings.add(inId);
            IERC721(asset).transferFrom(msg.sender, address(this), inId);
            unchecked {
                ++i;
            }
        }
        _mint(to, outAmount);
        emit Mint(inIds, outAmount, to);
    }

    /// @inheritdoc IPool
    function redeem(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to
    ) public override {
        if (inAmount == 0) {
            revert Pool__InsufficientIn();
        }
        if (inAmount != outIds.length * 10**18) {
            revert Pool__InOutMismatch();
        }
        if (to == address(0)) {
            revert Pool__InvalidTo();
        }
        _burn(msg.sender, inAmount);
        for (uint256 i; i < outIds.length; ) {
            uint256 outId = outIds[i];
            holdings.remove(outId);
            IERC721(asset).transferFrom(address(this), to, outId);
            unchecked {
                ++i;
            }
        }
        emit Redeem(inAmount, outIds, to);
    }

    /// @inheritdoc IPool
    function redeemWithSignature(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to,
        uint256 deadline,
        bytes memory signature
    ) external override {
        permitInternal(inAmount, deadline, signature);
        redeem(inAmount, outIds, to);
    }

    /// @inheritdoc IPool
    function swap(
        uint256[] calldata inIds,
        uint256[] calldata outIds,
        address to
    ) external override {
        if (inIds.length == 0) {
            revert Pool__InsufficientIn();
        }
        if (inIds.length != outIds.length) {
            revert Pool__InOutMismatch();
        }
        if (to == address(0)) {
            revert Pool__InvalidTo();
        }
        for (uint256 i; i < inIds.length; ) {
            uint256 inId = inIds[i];
            holdings.add(inId);
            IERC721(asset).transferFrom(msg.sender, address(this), inId);
            uint256 outId = outIds[i];
            holdings.remove(outId);
            IERC721(asset).transferFrom(address(this), to, outId);
            unchecked {
                ++i;
            }
        }
        emit Swap(inIds, outIds, to);
    }
}
