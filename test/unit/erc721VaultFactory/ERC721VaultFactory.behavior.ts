import { expect } from "chai";

import { Vault__factory } from "../../../src/types/factories/Vault__factory";
import { getCreate2Address } from "../../shared/utils";

export function shouldBehaveLikeERC721VaultFactory(): void {
  describe("View Functions", function () {
    describe("allVaultsLength", function () {
      context("when no vaults exist", function () {
        it("should return 0", async function () {
          expect(await this.contracts.erc721VaultFactory.allVaultsLength()).to.equal("0");
        });
      });

      context("when vaults are created", function () {
        beforeEach(async function () {
          await this.contracts.erc721VaultFactory.createVault(this.mocks.nft.address);
        });

        it("should return the number of vaults", async function () {
          expect(await this.contracts.erc721VaultFactory.allVaultsLength()).to.equal("1");
        });
      });
    });
  });

  describe("Effects Functions", function () {
    describe("createVault", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.erc721VaultFactory.createVault(this.mocks.nft.address);
          await expect(contractCall)
            .to.emit(this.contracts.erc721VaultFactory, "CreateVault")
            .withArgs(
              "Mock NFT Vaulted",
              "MOCKv",
              this.mocks.nft.address,
              getCreate2Address(
                this.contracts.erc721VaultFactory.address,
                this.mocks.nft.address,
                Vault__factory.bytecode,
              ),
            );
        });
      });
    });
  });
}
