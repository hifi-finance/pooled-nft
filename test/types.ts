import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Fixture, MockContract } from "ethereum-waffle";

import type { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import type { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import type { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import type { GodModeERC721Pool } from "../src/types/GodModeERC721Pool";
import type { GodModeERC721Vault } from "../src/types/GodModeERC721Vault";

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
}

export interface Mocks {
  nft: MockContract;
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
  carol: SignerWithAddress;
}
