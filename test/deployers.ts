import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { GodModeVault } from "../src/types/GodModeVault";
import { VaultFactory } from "../src/types/VaultFactory";

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

export async function deployVaultFactory(deployer: Signer): Promise<VaultFactory> {
  const vaultFactoryArtifact: Artifact = await artifacts.readArtifact("VaultFactory");
  const vaultFactory: VaultFactory = <VaultFactory>await waffle.deployContract(deployer, vaultFactoryArtifact, []);
  return vaultFactory;
}
