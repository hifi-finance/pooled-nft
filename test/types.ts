import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Fixture, MockContract } from "ethereum-waffle";

import type { GodModePool } from "../src/types/GodModePool";
import type { GodModeVault } from "../src/types/GodModeVault";
import type { PoolFactory } from "../src/types/PoolFactory";
import type { VaultFactory } from "../src/types/VaultFactory";

declare module "mocha" {
  export interface Context {
    contracts: Contracts;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    mocks: Mocks;
    signers: Signers;
  }
}

export interface Contracts {
  pool: GodModePool;
  vault: GodModeVault;
  poolFactory: PoolFactory;
  vaultFactory: VaultFactory;
}

export interface Mocks {
  nft: MockContract;
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
}
