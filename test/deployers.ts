import type { Signer } from "@ethersproject/abstract-signer";
import { artifacts, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import { ERC1155PoolFactory } from "../src/types/ERC1155PoolFactory";
import { ERC1155VaultFactory } from "../src/types/ERC1155VaultFactory";
import { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import { GodModeERC721Pool } from "../src/types/GodModeERC721Pool";
import { GodModeERC721Vault } from "../src/types/GodModeERC721Vault";
import { GodModeERC1155Pool } from "../src/types/GodModeERC1155Pool";
import { GodModeERC1155Vault } from "../src/types/GodModeERC1155Vault";

export async function deployERC20Wnft(
  deployer: Signer,
  name: string,
  symbol: string,
  asset: string,
): Promise<GodModeERC20Wnft> {
  const erc20WnftArtifact: Artifact = await artifacts.readArtifact(
    "contracts/test/ERC-721/GodModeERC20Wnft.sol:GodModeERC20Wnft",
  );
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

export async function deployGodModeERC1155Pool(
  deployer: Signer,
  asset: string,
  id: string,
): Promise<GodModeERC1155Pool> {
  const erc1155PoolArtifact: Artifact = await artifacts.readArtifact("GodModeERC1155Pool");
  const erc1155Pool: GodModeERC1155Pool = <GodModeERC1155Pool>(
    await waffle.deployContract(deployer, erc1155PoolArtifact, [asset, id, await deployer.getAddress()])
  );
  return erc1155Pool;
}

export async function deployGodModeERC1155Vault(
  deployer: Signer,
  asset: string,
  id: string,
): Promise<GodModeERC1155Vault> {
  const erc1155VaultArtifact: Artifact = await artifacts.readArtifact("GodModeERC1155Vault");
  const erc1155Vault: GodModeERC1155Vault = <GodModeERC1155Vault>(
    await waffle.deployContract(deployer, erc1155VaultArtifact, [asset, id, await deployer.getAddress()])
  );
  return erc1155Vault;
}

export async function deployERC1155PoolFactory(deployer: Signer): Promise<ERC1155PoolFactory> {
  const erc1155PoolFactoryArtifact: Artifact = await artifacts.readArtifact("ERC1155PoolFactory");
  const erc1155PoolFactory: ERC1155PoolFactory = <ERC1155PoolFactory>(
    await waffle.deployContract(deployer, erc1155PoolFactoryArtifact, [])
  );
  return erc1155PoolFactory;
}

export async function deployERC1155VaultFactory(deployer: Signer): Promise<ERC1155VaultFactory> {
  const erc1155VaultFactoryArtifact: Artifact = await artifacts.readArtifact("ERC1155VaultFactory");
  const erc1155VaultFactory: ERC1155VaultFactory = <ERC1155VaultFactory>(
    await waffle.deployContract(deployer, erc1155VaultFactoryArtifact, [])
  );
  return erc1155VaultFactory;
}
