import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModePool } from "../src/types/GodModePool";
import { GodModeVault } from "../src/types/GodModeVault";

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

export async function deployERC721PoolFactory(deployer: Signer): Promise<ERC721PoolFactory> {
  const erc721PoolFactoryArtifact: Artifact = await artifacts.readArtifact("ERC721PoolFactory");
  const erc721PoolFactory: ERC721PoolFactory = <ERC721PoolFactory>(
    await waffle.deployContract(deployer, erc721PoolFactoryArtifact, [])
  );
  return erc721PoolFactory;
}

export async function deployERC721VaultFactory(deployer: Signer): Promise<ERC721VaultFactory> {
  const erc721VaultFactoryArtifact: Artifact = await artifacts.readArtifact("ERC721VaultFactory");
  const erc721VaultFactory: ERC721VaultFactory = <ERC721VaultFactory>(
    await waffle.deployContract(deployer, erc721VaultFactoryArtifact, [])
  );
  return erc721VaultFactory;
}
