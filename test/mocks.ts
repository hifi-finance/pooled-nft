import type { Signer } from "@ethersproject/abstract-signer";
import { MockContract } from "ethereum-waffle";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

export async function deployMockERC712(deployer: Signer): Promise<MockContract> {
  const artifact: Artifact = await artifacts.readArtifact("ERC721");
  const erc721: MockContract = await waffle.deployMockContract(deployer, artifact.abi);
  await erc721.mock.name.returns("Mock NFT");
  await erc721.mock.symbol.returns("MOCK");
  // 0x5b5e139f is the ERC-165 identifier for ERC721Metadata interface
  await erc721.mock.supportsInterface.withArgs("0x5b5e139f").returns(true);
  return erc721;
}

export async function deployMockERC1155(deployer: Signer): Promise<MockContract> {
  const artifact: Artifact = await artifacts.readArtifact("ERC1155");
  const erc1155: MockContract = await waffle.deployMockContract(deployer, artifact.abi);
  // 0xd9b67a26 is the ERC-165 identifier for ERC1155 interface
  await erc1155.mock.supportsInterface.withArgs("0xd9b67a26").returns(true);
  return erc1155;
}
