import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { GodModePool } from "../src/types/GodModePool";
import { PoolFactory } from "../src/types/PoolFactory";
import { deployGodModePool, deployPoolFactory } from "./deployers";
import { deployMockNft } from "./mocks";

type UnitFixturePoolReturnType = {
  nft: MockContract;
  pool: GodModePool;
};

type UnitFixturePoolFactoryReturnType = {
  nft: MockContract;
  poolFactory: PoolFactory;
};

export async function unitFixturePool(signers: Signer[]): Promise<UnitFixturePoolReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const pool = await deployGodModePool(deployer, "JPEG Pool", "pJPEG", nft.address);
  return { nft, pool };
}

export async function unitFixturePoolFactory(signers: Signer[]): Promise<UnitFixturePoolFactoryReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const poolFactory = await deployPoolFactory(deployer);
  return { nft, poolFactory };
}
