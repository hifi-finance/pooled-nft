import type { Signer } from "@ethersproject/abstract-signer";
import type { MockContract } from "ethereum-waffle";

import { VaultFactory } from "../src/types/VaultFactory";
import { deployVaultFactory } from "./deployers";
import { deployMockERC721 } from "./mocks";

type UnitFixtureVaultFactoryReturnType = {
  erc721: MockContract;
  vaultFactory: VaultFactory;
};

export async function unitFixtureVaultFactory(signers: Signer[]): Promise<UnitFixtureVaultFactoryReturnType> {
  const deployer: Signer = signers[0];
  const erc721 = await deployMockERC721(deployer);
  const vaultFactory = await deployVaultFactory(deployer);
  return { erc721, vaultFactory };
}
