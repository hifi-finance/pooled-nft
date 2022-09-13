import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Fixture, MockContract } from "ethereum-waffle";

import type { GodModePool } from "../src/types/GodModePool";
import type { PoolFactory } from "../src/types/PoolFactory";

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
  poolFactory: PoolFactory;
}

export interface Mocks {
  nft: MockContract;
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
}
