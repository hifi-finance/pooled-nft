// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./IERC1155Pool.sol";

import "./ERC20Wnft.sol";

/// @title ERC1155Pool
/// @author Hifi
contract ERC1155Pool is IERC1155Pool, ERC20Wnft, ERC1155Holder {
    /// PUBLIC STORAGE ///

    /// @dev The asset token IDs held in the pool.
    uint256 public override holdings;

    /// CONSTRUCTOR ///

    constructor() ERC20Wnft() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC1155Pool
    function mint(
        uint256 inAmount,
        uint256 outAmount,
        address to
    ) external override {
        if (inAmount == 0) {
            revert ERC1155Pool__InsufficientIn();
        }
        if (inAmount * 10**18 != outAmount) {
            revert ERC1155Pool__InOutMismatch();
        }
        if (to == address(0)) {
            revert ERC1155Pool__InvalidTo();
        }
        holdings += inAmount;
        IERC1155(asset).safeTransferFrom(msg.sender, address(this), assetId, inAmount, "");
        _mint(to, outAmount);
        emit Mint(inAmount, outAmount, to);
    }

    /// @inheritdoc IERC1155Pool
    function redeem(
        uint256 inAmount,
        uint256 outAmount,
        address to
    ) public override {
        if (inAmount == 0) {
            revert ERC1155Pool__InsufficientIn();
        }
        if (inAmount != outAmount * 10**18) {
            revert ERC1155Pool__InOutMismatch();
        }
        if (to == address(0)) {
            revert ERC1155Pool__InvalidTo();
        }
        _burn(msg.sender, inAmount);
        holdings -= outAmount;
        IERC1155(asset).safeTransferFrom(address(this), to, assetId, outAmount, "");
        emit Redeem(inAmount, outAmount, to);
    }
}
