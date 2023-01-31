import type { Signer } from "@ethersproject/abstract-signer";
import { MockContract } from "ethereum-waffle";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

export async function deployMockNft(deployer: Signer): Promise<MockContract> {
  const nftArtifact: Artifact = await artifacts.readArtifact("ERC721");
  const nft: MockContract = await waffle.deployMockContract(deployer, nftArtifact.abi);
  await nft.mock.name.returns("Mock NFT");
  await nft.mock.symbol.returns("MOCK");
  // 0x5b5e139f is the ERC-165 identifier for ERC721Metadata interface
  await nft.mock.supportsInterface.withArgs("0x5b5e139f").returns(true);
  return nft;
}
