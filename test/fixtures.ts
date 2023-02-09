import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModeERC721Pool } from "../src/types/GodModeERC721Pool";
import { GodModeERC721Vault } from "../src/types/GodModeERC721Vault";
import {
  deployERC20Wnft,
  deployERC721PoolFactory,
  deployERC721VaultFactory,
  deployGodModeERC721Pool,
  deployGodModeERC721Vault,
} from "./deployers";
import { deployMockNft } from "./mocks";

type UnitFixtureERC20WnftReturnType = {
  erc20Wnft: GodModeERC20Wnft;
};

type UnitFixtureERC721PoolReturnType = {
  nft: MockContract;
  erc721Pool: GodModeERC721Pool;
};

type UnitFixtureERC721VaultReturnType = {
  nft: MockContract;
  erc721Vault: GodModeERC721Vault;
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

export async function unitFixtureERC721Pool(signers: Signer[]): Promise<UnitFixtureERC721PoolReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const erc721Pool = await deployGodModeERC721Pool(deployer, "JPEG Pooled", "JPEGp", nft.address);
  return { nft, erc721Pool };
}

export async function unitFixtureERC721Vault(signers: Signer[]): Promise<UnitFixtureERC721VaultReturnType> {
  const deployer: Signer = signers[0];
  const nft = await deployMockNft(deployer);
  const erc721Vault = await deployGodModeERC721Vault(deployer, "JPEG Vaulted", "JPEGv", nft.address);
  return { nft, erc721Vault };
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
