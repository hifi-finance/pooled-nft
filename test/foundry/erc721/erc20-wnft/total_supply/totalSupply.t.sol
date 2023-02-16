// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4 <0.9.0;

import "forge-std/console2.sol";
import { ERC20Wnft_Test } from "../ERC20Wnft.t.sol";

contract TotalSupply_Test is ERC20Wnft_Test {
    /// @dev it should return total supply.
    function test_TotalSupply() external {
        uint256 actualTotalSupply = erc20Wnft.totalSupply();
        assertEq(actualTotalSupply, ONE_MILLION_WNFT, "totalSupply");
    }
}
