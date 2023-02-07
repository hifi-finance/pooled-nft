import { expect } from "chai";

import { Vault__factory } from "../../../src/types/factories/Vault__factory";
import { getCreate2Address } from "../../shared/utils";

export function shouldBehaveLikeVaultFactory(): void {
  describe("Effects Functions", function () {
    describe("createVault", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.vaultFactory.createVault(this.mocks.nft.address);
          await expect(contractCall)
            .to.emit(this.contracts.vaultFactory, "CreateVault")
            .withArgs(
              "Mock NFT Vaulted",
              "MOCKv",
              this.mocks.nft.address,
              getCreate2Address(this.contracts.vaultFactory.address, this.mocks.nft.address, Vault__factory.bytecode),
            );
        });
      });
    });
  });
}
