// SPDX-License-Identifier: TODO
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
    address public override asset;

    /// INTERNAL STORAGE ///

    /// @dev Todo.
    EnumerableSet.UintSet internal holdings;

    constructor(
        string memory name_,
        string memory symbol_,
        address asset_
    ) ERC20(name_, symbol_) {
        asset = asset_;
    }

    /// PUBLIC CONSTANT FUNCTIONS ///

    /// PUBLIC NON-CONSTANT FUNCTIONS ///

    /// @inheritdoc IVault
    function mint(uint256[] calldata inIds, address to) external override {
        uint256 inIdsLength = inIds.length;
        if (inIdsLength == 0) {
            revert Vault__InsufficientIn();
        }
        if (to == address(0)) {
            revert Vault__InvalidTo();
        }
        for (uint256 i; i < inIdsLength; ) {
            uint256 inId = inIds[i];
            holdings.add(inId);
            IERC721(asset).transferFrom(msg.sender, address(this), inId);
            unchecked {
                ++i;
            }
        }
        _mint(to, inIdsLength * 10**18);
        // TODO: check gas cost of including uint256[] in event.
        emit Mint(inIds, to);
    }

    /// @inheritdoc IVault
    function redeem(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to
    ) external override {
        uint256 outIdsLength = outIds.length;
        if (inAmount == 0) {
            revert Vault__InsufficientIn();
        }
        if (inAmount != outIdsLength * 10**18) {
            revert Vault__InOutMismatch();
        }
        if (to == address(0)) {
            revert Vault__InvalidTo();
        }
        _burn(msg.sender, inAmount);
        for (uint256 i; i < outIdsLength; ) {
            uint256 outId = outIds[i];
            holdings.remove(outId);
            IERC721(asset).transferFrom(address(this), to, outId);
            unchecked {
                ++i;
            }
        }
        // TODO: check gas cost of including uint256[] in event.
        emit Redeem(inAmount, outIds, to);
    }

    /// @inheritdoc IVault
    function swap(
        uint256[] calldata inIds,
        uint256[] calldata outIds,
        address to
    ) external override {
        uint256 inIdsLength = inIds.length;
        uint256 outIdsLength = outIds.length;
        if (inIdsLength == 0) {
            revert Vault__InsufficientIn();
        }
        if (inIdsLength != outIdsLength) {
            revert Vault__InOutMismatch();
        }
        if (to == address(0)) {
            revert Vault__InvalidTo();
        }
        for (uint256 i; i < inIdsLength; ) {
            IERC721(asset).transferFrom(msg.sender, address(this), inIds[i]);
            IERC721(asset).transferFrom(address(this), to, outIds[i]);
            unchecked {
                ++i;
            }
        }
        // TODO: check gas cost of including uint256[] in event.
        emit Swap(inIds, outIds, to);
    }
}
