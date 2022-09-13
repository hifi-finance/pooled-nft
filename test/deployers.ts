import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { GodModePool } from "../src/types/GodModePool";
import { PoolFactory } from "../src/types/PoolFactory";

export async function deployGodModePool(
  deployer: Signer,
  name: string,
  symbol: string,
  asset: string,
): Promise<GodModePool> {
  const poolArtifact: Artifact = await artifacts.readArtifact("GodModePool");
  const pool: GodModePool = <GodModePool>await waffle.deployContract(deployer, poolArtifact, [name, symbol, asset]);
  return pool;
}

export async function deployPoolFactory(deployer: Signer): Promise<PoolFactory> {
  const poolFactoryArtifact: Artifact = await artifacts.readArtifact("PoolFactory");
  const poolFactory: PoolFactory = <PoolFactory>await waffle.deployContract(deployer, poolFactoryArtifact, []);
  return poolFactory;
}
