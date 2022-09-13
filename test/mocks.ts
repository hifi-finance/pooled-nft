import type { Signer } from "@ethersproject/abstract-signer";
import { MockContract } from "ethereum-waffle";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

export async function deployMockNft(deployer: Signer): Promise<MockContract> {
  const nftArtifact: Artifact = await artifacts.readArtifact("ERC721");
  const nft: MockContract = await waffle.deployMockContract(deployer, nftArtifact.abi);
  await nft.mock.name.returns("Mock NFT");
  await nft.mock.symbol.returns("MOCK");
  return nft;
}
