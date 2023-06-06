// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import { Base_Test } from "test/foundry/Base.t.sol";
import { PeripheralERC721Pool } from "contracts/ERC-721/PeripheralERC721Pool.sol";
import { GodModeERC721Pool } from "contracts/test/ERC-721/GodModeERC721Pool.sol";

/// @title PeripheralERC721Pool_Test
/// @author Hifi
/// @notice Common contract members needed across PeripheralERC721Pool test contracts.
abstract contract PeripheralERC721Pool_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event BulkDeposit(address pool, uint256[] ids, address caller);
    event BulkWithdraw(address pool, uint256[] ids, address caller);
    event WithdrawAvailable(address pool, uint256[] withdrawnIds, address caller);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/

    PeripheralERC721Pool internal peripheralERC721Pool = new PeripheralERC721Pool();
    GodModeERC721Pool internal erc721Pool = new GodModeERC721Pool("JPEG Pool", "JPEGp", address(nft));

    /*//////////////////////////////////////////////////////////////////////////
                                   SETUP FUNCTION
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev A setup function invoked before each test case.
    function setUp() public virtual override {
        Base_Test.setUp();
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
