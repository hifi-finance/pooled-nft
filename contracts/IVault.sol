// SPDX-License-Identifier: TODO
pragma solidity >=0.8.4;

/// @title IVault
/// @author Hifi
/// @notice Todo.
interface IVault {
    /// CUSTOM ERRORS ///

    /// EVENTS ///

    /// CONSTANT FUNCTIONS ///

    /// @notice Todo.
    /// @return Todo.
    function asset() external view returns (address);

    /// @notice Todo.
    /// @return Todo.
    function holdings() external view returns (uint256[] memory);

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
