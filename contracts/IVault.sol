// SPDX-License-Identifier: TODO
pragma solidity >=0.8.4;

/// @title IVault
/// @author Hifi
/// @notice Todo.
interface IVault {
    /// CUSTOM ERRORS ///

    /// EVENTS ///

    /// @notice Todo.
    /// @param inIds Todo.
    /// @param to Todo.
    event Mint(uint256[] inIds, address indexed to);

    /// @notice Todo.
    /// @param inAmount Todo.
    /// @param outIds Todo.
    /// @param to Todo.
    event Redeem(uint256 inAmount, uint256[] outIds, address indexed to);

    /// @notice Todo.
    /// @param inIds Todo.
    /// @param outIds Todo.
    /// @param to Todo.
    event Swap(uint256[] inIds, uint256[] outIds, address indexed to);

    /// CONSTANT FUNCTIONS ///

    /// @notice Todo.
    /// @return Todo.
    function asset() external view returns (address);

    /// NON-CONSTANT FUNCTIONS ///

    /// @notice Todo.
    ///
    /// @dev Emits a {Mint} event.
    ///
    /// Requirements:
    ///
    /// - Todo.
    ///
    /// @param inIds Todo.
    /// @param to Todo.
    function mint(uint256[] calldata inIds, address to) external;

    /// @notice Todo.
    ///
    /// @dev Emits a {Redeem} event.
    ///
    /// Requirements:
    ///
    /// - Todo.
    ///
    /// @param inAmount Todo.
    /// @param outIds Todo.
    /// @param to Todo.
    function redeem(
        uint256 inAmount,
        uint256[] calldata outIds,
        address to
    ) external;

    /// @notice Todo.
    ///
    /// @dev Emits a {Swap} event.
    ///
    /// Requirements:
    ///
    /// - Todo.
    ///
    /// @param inIds Todo.
    /// @param outIds Todo.
    /// @param to Todo.
    function swap(
        uint256[] calldata inIds,
        uint256[] calldata outIds,
        address to
    ) external;
}
