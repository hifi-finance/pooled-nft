// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { BaseTest } from "../BaseTest.t.sol";
import { GodModePool } from "contracts/test/GodModePool.sol";
import { SigUtils } from "../utils/SigUtils.sol";

/// @title PoolTest
/// @author Hifi
/// @notice Common contract members needed across Pool test contracts.
abstract contract PoolTest is BaseTest {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event Mint(uint256[] inIds, uint256 outAmount, address indexed to);
    event Redeem(uint256 inAmount, uint256[] outIds, address indexed to);
    event Swap(uint256[] inIds, uint256[] outIds, address indexed to);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    GodModePool internal pool = new GodModePool("JPEG Pooled", "JPEGp", address(nft));
    SigUtils internal sigUtils = new SigUtils(pool.DOMAIN_SEPARATOR());

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        BaseTest.setUp();
        // Make Alice the default caller in all subsequent tests.
        changePrank(users.alice);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                   HELPERS
    //////////////////////////////////////////////////////////////////////////*/

    function mintNft(address beneficiary, uint256[] memory tokenIds) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            nft.__godMode_mint(beneficiary, tokenIds[i]);
        }
    }
}
