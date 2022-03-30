import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Fixture, MockContract } from "ethereum-waffle";

import type { GodModeVault } from "../src/types/GodModeVault";
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
  vault: GodModeVault;
  vaultFactory: VaultFactory;
}

export interface Mocks {
  erc721: MockContract;
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
}
