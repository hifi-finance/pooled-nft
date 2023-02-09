import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModeERC721Pool } from "../src/types/GodModeERC721Pool";
import { GodModeERC721Vault } from "../src/types/GodModeERC721Vault";

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

export async function deployGodModeERC721Pool(
  deployer: Signer,
  name: string,
  symbol: string,
  asset: string,
): Promise<GodModeERC721Pool> {
  const erc721PoolArtifact: Artifact = await artifacts.readArtifact("GodModeERC721Pool");
  const erc721Pool: GodModeERC721Pool = <GodModeERC721Pool>(
    await waffle.deployContract(deployer, erc721PoolArtifact, [name, symbol, asset])
  );
  return erc721Pool;
}

export async function deployGodModeERC721Vault(
  deployer: Signer,
  name: string,
  symbol: string,
  asset: string,
): Promise<GodModeERC721Vault> {
  const erc721VaultArtifact: Artifact = await artifacts.readArtifact("GodModeERC721Vault");
  const erc721Vault: GodModeERC721Vault = <GodModeERC721Vault>(
    await waffle.deployContract(deployer, erc721VaultArtifact, [name, symbol, asset])
  );
  return erc721Vault;
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
