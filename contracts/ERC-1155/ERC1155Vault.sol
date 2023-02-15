// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "./IERC1155Vault.sol";

import "./ERC20Wnft.sol";

/// @title ERC1155Vault
/// @author Hifi
contract ERC1155Vault is IERC1155Vault, ERC20Wnft {
    /// PUBLIC STORAGE ///

    /// @dev The asset tokens held for a user account in the vault.
    mapping(address => uint256) internal holdings;

    /// CONSTRUCTOR ///

    constructor() ERC20Wnft() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC1155Vault
    function holdingsFor(address account) external view override returns (uint256) {
        return holdings[account];
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC1155Vault
    function deposit(
        uint256 inAmount,
        uint256 outAmount,
        address to
    ) external override {
        if (inAmount == 0) {
            revert ERC1155Vault__InsufficientIn();
        }
        if (inAmount * 10**18 != outAmount) {
            revert ERC1155Vault__InOutMismatch();
        }
        if (to == address(0)) {
            revert ERC1155Vault__InvalidTo();
        }
        holdings[msg.sender] += inAmount;
        IERC1155(asset).safeTransferFrom(msg.sender, address(this), assetId, inAmount, "");
        _mint(to, outAmount);
        emit Deposit(inAmount, outAmount, to);
    }

    /// @inheritdoc IERC1155Vault
    function withdraw(
        uint256 inAmount,
        uint256 outAmount,
        address to
    ) public override {
        if (inAmount == 0) {
            revert ERC1155Vault__InsufficientIn();
        }
        if (inAmount != outAmount * 10**18) {
            revert ERC1155Vault__InOutMismatch();
        }
        if (to == address(0)) {
            revert ERC1155Vault__InvalidTo();
        }
        _burn(msg.sender, inAmount);
        holdings[msg.sender] -= outAmount;
        IERC1155(asset).safeTransferFrom(address(this), to, assetId, outAmount, "");
        emit Withdraw(inAmount, outAmount, to);
    }
}
