import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { GodModeVault } from "../src/types/GodModeVault";
import { VaultFactory } from "../src/types/VaultFactory";
import { deployGodModeVault, deployVaultFactory } from "./deployers";
import { deployMockERC721 } from "./mocks";

type UnitFixtureVaulteturnType = {
  erc721: MockContract;
  vault: GodModeVault;
};

type UnitFixtureVaultFactoryReturnType = {
  erc721: MockContract;
  vaultFactory: VaultFactory;
};

export async function unitFixtureVault(signers: Signer[]): Promise<UnitFixtureVaulteturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC721(deployer);
  const vault = await deployGodModeVault(deployer, "JPEG Vault", "wJPEG", erc721.address);
  return { erc721, vault };
}

export async function unitFixtureVaultFactory(signers: Signer[]): Promise<UnitFixtureVaultFactoryReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC721(deployer);
  const vaultFactory = await deployVaultFactory(deployer);
  return { erc721, vaultFactory };
}
