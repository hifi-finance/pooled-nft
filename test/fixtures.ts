import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModePool } from "../src/types/GodModePool";
import { GodModeVault } from "../src/types/GodModeVault";
import {
  deployERC20Wnft,
  deployERC721PoolFactory,
  deployERC721VaultFactory,
  deployGodModePool,
  deployGodModeVault,
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

type UnitFixtureERC721PoolFactoryReturnType = {
  nft: MockContract;
  erc721PoolFactory: ERC721PoolFactory;
};

type UnitFixtureERC721VaultFactoryReturnType = {
  nft: MockContract;
  erc721VaultFactory: ERC721VaultFactory;
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

export async function unitFixtureERC721PoolFactory(signers: Signer[]): Promise<UnitFixtureERC721PoolFactoryReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const erc721PoolFactory = await deployERC721PoolFactory(deployer);
  return { nft, erc721PoolFactory };
}

export async function unitFixtureERC721VaultFactory(
  signers: Signer[],
): Promise<UnitFixtureERC721VaultFactoryReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const erc721VaultFactory = await deployERC721VaultFactory(deployer);
  return { nft, erc721VaultFactory };
}
