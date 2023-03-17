import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModeERC721Pool } from "../src/types/GodModeERC721Pool";
import { deployERC20Wnft, deployERC721PoolFactory, deployGodModeERC721Pool } from "./deployers";
import { deployMockERC712 } from "./mocks";

type UnitFixtureERC20WnftReturnType = {
  erc20Wnft: GodModeERC20Wnft;
};

type UnitFixtureERC721PoolReturnType = {
  erc721: MockContract;
  erc721Pool: GodModeERC721Pool;
};

type UnitFixtureERC721PoolFactoryReturnType = {
  erc721: MockContract;
  erc721PoolFactory: ERC721PoolFactory;
};

type UnitFixtureERC721VaultFactoryReturnType = {
  erc721: MockContract;
  erc721VaultFactory: ERC721VaultFactory;
};

export async function unitFixtureERC20Wnft(signers: Signer[]): Promise<UnitFixtureERC20WnftReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC712(deployer);
  const erc20Wnft = await deployERC20Wnft(deployer, "My Token", "MTK", erc721.address);
  return { erc20Wnft };
}

export async function unitFixtureERC721Pool(signers: Signer[]): Promise<UnitFixtureERC721PoolReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC712(deployer);
  const erc721Pool = await deployGodModeERC721Pool(deployer, "JPEG Pool", "JPEGp", erc721.address);
  return { erc721, erc721Pool };
}

export async function unitFixtureERC721PoolFactory(signers: Signer[]): Promise<UnitFixtureERC721PoolFactoryReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC712(deployer);
  const erc721PoolFactory = await deployERC721PoolFactory(deployer);
  return { erc721, erc721PoolFactory };
}
