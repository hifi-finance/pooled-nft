import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModePool } from "../src/types/GodModePool";
import { GodModeVault } from "../src/types/GodModeVault";
import { PoolFactory } from "../src/types/PoolFactory";
import { VaultFactory } from "../src/types/VaultFactory";

export async function deployERC20Wnft(
  deployer: Signer,
  name: string,
  symbol: string,
  asset: string,
): Promise<GodModeERC20Wnft> {
  const erc20WnftArtifact: Artifact = await artifacts.readArtifact("GodModeERC20Wnft");
  const erc20Wnft: GodModeERC20Wnft = <GodModeERC20Wnft>(
    await waffle.deployContract(deployer, erc20WnftArtifact, [name, symbol, asset])
  );
  return erc20Wnft;
}

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

export async function deployGodModeVault(
  deployer: Signer,
  name: string,
  symbol: string,
  asset: string,
): Promise<GodModeVault> {
  const vaultArtifact: Artifact = await artifacts.readArtifact("GodModeVault");
  const vault: GodModeVault = <GodModeVault>await waffle.deployContract(deployer, vaultArtifact, [name, symbol, asset]);
  return vault;
}

export async function deployPoolFactory(deployer: Signer): Promise<PoolFactory> {
  const poolFactoryArtifact: Artifact = await artifacts.readArtifact("PoolFactory");
  const poolFactory: PoolFactory = <PoolFactory>await waffle.deployContract(deployer, poolFactoryArtifact, []);
  return poolFactory;
}

export async function deployVaultFactory(deployer: Signer): Promise<VaultFactory> {
  const vaultFactoryArtifact: Artifact = await artifacts.readArtifact("VaultFactory");
  const vaultFactory: VaultFactory = <VaultFactory>await waffle.deployContract(deployer, vaultFactoryArtifact, []);
  return vaultFactory;
}
