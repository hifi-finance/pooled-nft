import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModePool } from "../src/types/GodModePool";
import { GodModeVault } from "../src/types/GodModeVault";
import { PoolFactory } from "../src/types/PoolFactory";
import { VaultFactory } from "../src/types/VaultFactory";
import {
  deployERC20Wnft,
  deployGodModePool,
  deployGodModeVault,
  deployPoolFactory,
  deployVaultFactory,
} from "./deployers";
import { deployMockNft } from "./mocks";

type UnitFixtureERC20WnftReturnType = {
  erc20Wnft: GodModeERC20Wnft;
};

type UnitFixturePoolReturnType = {
  nft: MockContract;
  pool: GodModePool;
};

type UnitFixtureVaultReturnType = {
  nft: MockContract;
  vault: GodModeVault;
};

type UnitFixturePoolFactoryReturnType = {
  nft: MockContract;
  poolFactory: PoolFactory;
};

type UnitFixtureVaultFactoryReturnType = {
  nft: MockContract;
  vaultFactory: VaultFactory;
};

export async function unitFixtureERC20Wnft(signers: Signer[]): Promise<UnitFixtureERC20WnftReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const erc20Wnft = await deployERC20Wnft(deployer, "My Token", "MTK", nft.address);
  return { erc20Wnft };
}

export async function unitFixturePool(signers: Signer[]): Promise<UnitFixturePoolReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const pool = await deployGodModePool(deployer, "JPEG Pool", "pJPEG", nft.address);
  return { nft, pool };
}

export async function unitFixtureVault(signers: Signer[]): Promise<UnitFixtureVaultReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const vault = await deployGodModeVault(deployer, "JPEG Vault", "vJPEG", nft.address);
  return { nft, vault };
}

export async function unitFixturePoolFactory(signers: Signer[]): Promise<UnitFixturePoolFactoryReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const poolFactory = await deployPoolFactory(deployer);
  return { nft, poolFactory };
}

export async function unitFixtureVaultFactory(signers: Signer[]): Promise<UnitFixtureVaultFactoryReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const vaultFactory = await deployVaultFactory(deployer);
  return { nft, vaultFactory };
}
