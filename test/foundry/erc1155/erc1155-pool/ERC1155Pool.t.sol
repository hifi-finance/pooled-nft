// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;
import "forge-std/console2.sol";
import { Base_Test } from "test/foundry/Base.t.sol";
import { GodModeERC1155Pool } from "contracts/test/ERC-1155/GodModeERC1155Pool.sol";
import { SigUtils } from "test/foundry/utils/SigUtils.sol";

/// @title ERC1155Pool_Test
/// @author Hifi
/// @notice Common contract members needed across Pool test contracts.
abstract contract ERC1155Pool_Test is Base_Test {
    /*//////////////////////////////////////////////////////////////////////////
                                       EVENTS
    //////////////////////////////////////////////////////////////////////////*/

    event Mint(uint256 inAmount, uint256 outAmount, address indexed to);
    event Redeem(uint256 inAmount, uint256 outAmount, address indexed to);

    /*//////////////////////////////////////////////////////////////////////////
                                 TESTING CONTRACTS
    //////////////////////////////////////////////////////////////////////////*/
    GodModeERC1155Pool internal erc1155Pool = new GodModeERC1155Pool(address(erc1155), 123, msg.sender);

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

    function mintNft(
        address beneficiary,
        uint256 tokenId,
        uint256 tokenAmount
    ) internal {
        erc1155.__godMode_mint(beneficiary, tokenId, tokenAmount);
    }
}
