import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Fixture, MockContract } from "ethereum-waffle";

import type { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import type { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import type { ERC1155PoolFactory } from "../src/types/ERC1155PoolFactory";
import type { ERC1155VaultFactory } from "../src/types/ERC1155VaultFactory";
import type { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import type { GodModeERC721Pool } from "../src/types/GodModeERC721Pool";
import type { GodModeERC721Vault } from "../src/types/GodModeERC721Vault";
import type { GodModeERC1155Pool } from "../src/types/GodModeERC1155Pool";
import type { GodModeERC1155Vault } from "../src/types/GodModeERC1155Vault";

declare module "mocha" {
  export interface Context {
    contracts: Contracts;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    mocks: Mocks;
    signers: Signers;
  }
}

export interface Contracts {
  erc20Wnft: GodModeERC20Wnft;
  erc721Pool: GodModeERC721Pool;
  erc721Vault: GodModeERC721Vault;
  erc721PoolFactory: ERC721PoolFactory;
  erc721VaultFactory: ERC721VaultFactory;
  erc1155Pool: GodModeERC1155Pool;
  erc1155Vault: GodModeERC1155Vault;
  erc1155PoolFactory: ERC1155PoolFactory;
  erc1155VaultFactory: ERC1155VaultFactory;
}

export interface Mocks {
  erc721: MockContract;
  erc1155: MockContract;
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
  carol: SignerWithAddress;
}
