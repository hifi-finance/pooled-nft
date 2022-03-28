import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { VaultFactory } from "../src/types/VaultFactory";

export async function deployVaultFactory(deployer: Signer): Promise<VaultFactory> {
  const vaultFactoryArtifact: Artifact = await artifacts.readArtifact("VaultFactory");
  const vaultFactory: VaultFactory = <VaultFactory>await waffle.deployContract(deployer, vaultFactoryArtifact, []);
  return vaultFactory;
}
