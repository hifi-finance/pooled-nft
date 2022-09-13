import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { GodModePool } from "../src/types/GodModePool";
import { PoolFactory } from "../src/types/PoolFactory";
import { deployGodModePool, deployPoolFactory } from "./deployers";
import { deployMockERC721 } from "./mocks";

type UnitFixturePooleturnType = {
  erc721: MockContract;
  pool: GodModePool;
};

type UnitFixturePoolFactoryReturnType = {
  erc721: MockContract;
  poolFactory: PoolFactory;
};

export async function unitFixturePool(signers: Signer[]): Promise<UnitFixturePooleturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC721(deployer);
  const pool = await deployGodModePool(deployer, "JPEG Pool", "wJPEG", erc721.address);
  return { erc721, pool };
}

export async function unitFixturePoolFactory(signers: Signer[]): Promise<UnitFixturePoolFactoryReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC721(deployer);
  const poolFactory = await deployPoolFactory(deployer);
  return { erc721, poolFactory };
}
