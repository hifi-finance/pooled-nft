// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;
import "forge-std/console2.sol";
import { Pool } from "contracts/Pool.sol";

import { BaseTest } from "../BaseTest.t.sol";

/// @title PoolTest
/// @author Hifi
/// @notice Common contract members needed across Pool test contracts.
abstract contract PoolTest is BaseTest {
    Pool public pool;

    /// EVENTS ///
    event Mint(uint256[] inIds, uint256 outAmount, address indexed to);
    event Redeem(uint256 inAmount, uint256[] outIds, address indexed to);
    event Swap(uint256[] inIds, uint256[] outIds, address indexed to);

    /// SETUP FUNCTION ///
    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        BaseTest.setUp();
        pool = new Pool("JPEG Pool", "pJPEG", address(nft));
        // Make Alice the default caller in all subsequent tests.
        changePrank(users.alice);
    }

    /// HELPERS ///
    function mintNft(address beneficiary, uint256[] memory tokenIds) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nft.__godMode_mint(beneficiary, tokenIds[i]);
        }
    }

    function mintPoolTokens(address beneficiary, uint256[] memory tokenIds) internal returns (uint256[] memory) {
        mintNft(beneficiary, tokenIds);
        uint256 outAmount = tokenIds.length * 10**18;
        changePrank(beneficiary);
        nft.setApprovalForAll(address(pool), true);
        pool.mint(tokenIds, outAmount, beneficiary);
        return tokenIds;
    }

    /// @dev Checks common assumptions for the test.
    function checkAssumptions(address beneficiary, uint256[] memory inIds) internal pure {
        vm.assume(beneficiary != address(0));
        vm.assume(inIds.length != 0);
        for (uint256 i = 0; i < inIds.length; i++) {
            for (uint256 j = i + 1; j < inIds.length; j++) {
                vm.assume(inIds[i] != inIds[j]);
            }
        }
    }
}
