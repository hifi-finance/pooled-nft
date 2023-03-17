import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { Fixture, MockContract } from "ethereum-waffle";

import type { ERC721PoolFactory } from "../src/types/ERC721PoolFactory";
import type { GodModeERC20Wnft } from "../src/types/GodModeERC20Wnft";
import type { GodModeERC721Pool } from "../src/types/GodModeERC721Pool";

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
  erc721PoolFactory: ERC721PoolFactory;
}

export interface Mocks {
  erc721: MockContract;
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
  carol: SignerWithAddress;
}
