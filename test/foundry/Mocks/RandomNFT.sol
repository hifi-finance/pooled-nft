// SPDX-License-Identifier: UNLICENSED
// solhint-disable
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// Random mock nft that does not provide any additional metadata information
contract RandomNFT is IERC721 {
    function supportsInterface(bytes4 interfaceId) external view override returns (bool) {}

    function balanceOf(address owner) external view override returns (uint256 balance) {}

    function ownerOf(uint256 tokenId) external view override returns (address owner) {}

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external override {}

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external override {}

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external override {}

    function approve(address to, uint256 tokenId) external override {}

    function setApprovalForAll(address operator, bool _approved) external override {}

    function getApproved(uint256 tokenId) external view override returns (address operator) {}

    function isApprovedForAll(address owner, address operator) external view override returns (bool) {}
}
