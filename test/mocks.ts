import type { Signer } from "@ethersproject/abstract-signer";
import { MockContract } from "ethereum-waffle";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

export async function deployMockERC721(deployer: Signer): Promise<MockContract> {
  const erc721Artifact: Artifact = await artifacts.readArtifact("ERC721");
  const erc721: MockContract = await waffle.deployMockContract(deployer, erc721Artifact.abi);
  await erc721.mock.name.returns("Mock ERC721");
  await erc721.mock.symbol.returns("MOCK");
  return erc721;
}
