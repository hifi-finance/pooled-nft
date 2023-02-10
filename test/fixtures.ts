import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import { ERC1155PoolFactory } from "../src/types/ERC1155PoolFactory";
import { ERC1155VaultFactory } from "../src/types/ERC1155VaultFactory";
import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModeERC721Pool } from "../src/types/GodModeERC721Pool";
import { GodModeERC721Vault } from "../src/types/GodModeERC721Vault";
import { GodModeERC1155Pool } from "../src/types/GodModeERC1155Pool";
import { GodModeERC1155Vault } from "../src/types/GodModeERC1155Vault";
import {
  deployERC20Wnft,
  deployERC721PoolFactory,
  deployERC721VaultFactory,
  deployERC1155PoolFactory,
  deployERC1155VaultFactory,
  deployGodModeERC721Pool,
  deployGodModeERC721Vault,
  deployGodModeERC1155Pool,
  deployGodModeERC1155Vault,
} from "./deployers";
import { deployMockERC712, deployMockERC1155 } from "./mocks";

type UnitFixtureERC20WnftReturnType = {
  erc20Wnft: GodModeERC20Wnft;
};

type UnitFixtureERC721PoolReturnType = {
  erc721: MockContract;
  erc721Pool: GodModeERC721Pool;
};

type UnitFixtureERC721VaultReturnType = {
  erc721: MockContract;
  erc721Vault: GodModeERC721Vault;
};

type UnitFixtureERC721PoolFactoryReturnType = {
  erc721: MockContract;
  erc721PoolFactory: ERC721PoolFactory;
};

type UnitFixtureERC721VaultFactoryReturnType = {
  erc721: MockContract;
  erc721VaultFactory: ERC721VaultFactory;
};

type UnitFixtureERC1155PoolReturnType = {
  erc1155: MockContract;
  erc1155Pool: GodModeERC1155Pool;
};

type UnitFixtureERC1155VaultReturnType = {
  erc1155: MockContract;
  erc1155Vault: GodModeERC1155Vault;
};

type UnitFixtureERC1155PoolFactoryReturnType = {
  erc1155: MockContract;
  erc1155PoolFactory: ERC1155PoolFactory;
};

type UnitFixtureERC1155VaultFactoryReturnType = {
  erc1155: MockContract;
  erc1155VaultFactory: ERC1155VaultFactory;
};

export async function unitFixtureERC20Wnft(signers: Signer[]): Promise<UnitFixtureERC20WnftReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC712(deployer);
  const erc20Wnft = await deployERC20Wnft(deployer, "My Token", "MTK", erc721.address);
  return { erc20Wnft };
}

export async function unitFixtureERC721Pool(signers: Signer[]): Promise<UnitFixtureERC721PoolReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC712(deployer);
  const erc721Pool = await deployGodModeERC721Pool(deployer, "JPEG Pooled", "JPEGp", erc721.address);
  return { erc721, erc721Pool };
}

export async function unitFixtureERC721Vault(signers: Signer[]): Promise<UnitFixtureERC721VaultReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC712(deployer);
  const erc721Vault = await deployGodModeERC721Vault(deployer, "JPEG Vaulted", "JPEGv", erc721.address);
  return { erc721, erc721Vault };
}

export async function unitFixtureERC721PoolFactory(signers: Signer[]): Promise<UnitFixtureERC721PoolFactoryReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC712(deployer);
  const erc721PoolFactory = await deployERC721PoolFactory(deployer);
  return { erc721, erc721PoolFactory };
}

export async function unitFixtureERC721VaultFactory(
  signers: Signer[],
): Promise<UnitFixtureERC721VaultFactoryReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC712(deployer);
  const erc721VaultFactory = await deployERC721VaultFactory(deployer);
  return { erc721, erc721VaultFactory };
}

export async function unitFixtureERC1155Pool(signers: Signer[]): Promise<UnitFixtureERC1155PoolReturnType> {
  const deployer: Signer = signers[0];
  const erc1155 = await deployMockERC1155(deployer);
  const erc1155Pool = await deployGodModeERC1155Pool(deployer, erc1155.address, "123");
  return { erc1155, erc1155Pool };
}

export async function unitFixtureERC1155Vault(signers: Signer[]): Promise<UnitFixtureERC1155VaultReturnType> {
  const deployer: Signer = signers[0];
  const erc1155 = await deployMockERC1155(deployer);
  const erc1155Vault = await deployGodModeERC1155Vault(deployer, erc1155.address, "123");
  return { erc1155, erc1155Vault };
}

export async function unitFixtureERC1155PoolFactory(
  signers: Signer[],
): Promise<UnitFixtureERC1155PoolFactoryReturnType> {
  const deployer: Signer = signers[0];
  const erc1155 = await deployMockERC1155(deployer);
  const erc1155PoolFactory = await deployERC1155PoolFactory(deployer);
  return { erc1155, erc1155PoolFactory };
}

export async function unitFixtureERC1155VaultFactory(
  signers: Signer[],
): Promise<UnitFixtureERC1155VaultFactoryReturnType> {
  const deployer: Signer = signers[0];
  const erc1155 = await deployMockERC1155(deployer);
  const erc1155VaultFactory = await deployERC1155VaultFactory(deployer);
  return { erc1155, erc1155VaultFactory };
}
