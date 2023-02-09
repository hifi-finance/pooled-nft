import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Fixture, MockContract } from "ethereum-waffle";

import type { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import type { ERC721VaultFactory } from "../src/types/ERC721VaultFactory";
import type { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import type { GodModePool } from "../src/types/GodModePool";
import type { GodModeVault } from "../src/types/GodModeVault";

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
  pool: GodModePool;
  vault: GodModeVault;
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
