// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./IVault.sol";

/// @title Vault
/// @author Hifi
contract Vault is IVault, ERC20 {
    using EnumerableSet for EnumerableSet.UintSet;

    /// PUBLIC STORAGE ///

    /// @inheritdoc IVault
    address public immutable override asset;

    /// INTERNAL STORAGE ///

    /// @dev The asset token IDs held for a user account in the vault.
    mapping(address => EnumerableSet.UintSet) internal holdings;

    /// CONSTRUCTOR ///

    constructor(
        string memory name_,
        string memory symbol_,
        address asset_
    ) ERC20(name_, symbol_) {
        asset = asset_;
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// @inheritdoc IVault
    function holdingAt(address account, uint256 index) external view override returns (uint256) {
        return holdings[account].at(index);
    }

    /// @inheritdoc IVault
    function holdingsLength(address account) external view override returns (uint256) {
        return holdings[account].length();
    }

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IVault
    function deposit(
        uint256[] calldata inIds,
        uint256 outAmount,
        address to
    ) external override {
        if (inIds.length == 0) {
            revert Vault__InsufficientIn();
        }
        if (inIds.length * 10**18 != outAmount) {
            revert Vault__InOutMismatch();
        }
        if (to == address(0)) {
            revert Vault__InvalidTo();
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

    /// @inheritdoc IVault
    function withdraw(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to
    ) external override {
        if (inAmount == 0) {
            revert Vault__InsufficientIn();
        }
        if (inAmount != outIds.length * 10**18) {
            revert Vault__InOutMismatch();
        }
        if (to == address(0)) {
            revert Vault__InvalidTo();
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
}
