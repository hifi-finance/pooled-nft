// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IERC721Vault.sol";

import "./ERC20Wnft.sol";

/// @title ERC721Vault
/// @author Hifi
contract ERC721Vault is IERC721Vault, ERC20Wnft {
    using EnumerableSet for EnumerableSet.UintSet;

    /// INTERNAL STORAGE ///

    /// @dev The asset token IDs held for a user account in the vault.
    mapping(address => EnumerableSet.UintSet) internal holdings;

    /// CONSTRUCTOR ///

    constructor() ERC20Wnft() {
        // solhint-disable-previous-line no-empty-blocks
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC721Vault
    function holdingAt(address account, uint256 index) external view override returns (uint256) {
        return holdings[account].at(index);
    }

    /// @inheritdoc IERC721Vault
    function holdingsLength(address account) external view override returns (uint256) {
        return holdings[account].length();
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IERC721Vault
    function deposit(
        uint256[] calldata inIds,
        uint256 outAmount,
        address to
    ) external override {
        if (inIds.length == 0) {
            revert ERC721Vault__InsufficientIn();
        }
        if (inIds.length * 10**18 != outAmount) {
            revert ERC721Vault__InOutMismatch();
        }
        if (to == address(0)) {
            revert ERC721Vault__InvalidTo();
        }
        for (uint256 i; i < inIds.length; ) {
            uint256 inId = inIds[i];
            holdings[msg.sender].add(inId);
            IERC721(asset).transferFrom(msg.sender, address(this), inId);
            unchecked {
                ++i;
            }
        }
        _mint(to, outAmount);
        emit Deposit(inIds, outAmount, to);
    }

    /// @inheritdoc IERC721Vault
    function withdraw(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to
    ) public override {
        if (inAmount == 0) {
            revert ERC721Vault__InsufficientIn();
        }
        if (inAmount != outIds.length * 10**18) {
            revert ERC721Vault__InOutMismatch();
        }
        if (to == address(0)) {
            revert ERC721Vault__InvalidTo();
        }
        _burn(msg.sender, inAmount);
        for (uint256 i; i < outIds.length; ) {
            uint256 outId = outIds[i];
            holdings[msg.sender].remove(outId);
            IERC721(asset).transferFrom(address(this), to, outId);
            unchecked {
                ++i;
            }
        }
        emit Withdraw(inAmount, outIds, to);
    }

    /// @inheritdoc IERC721Vault
    function withdrawWithSignature(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to,
        uint256 deadline,
        bytes memory signature
    ) external override {
        permitInternal(inAmount, deadline, signature);
        withdraw(inAmount, outIds, to);
    }
}
