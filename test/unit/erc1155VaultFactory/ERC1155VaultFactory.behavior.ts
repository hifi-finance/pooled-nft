import { expect } from "chai";

import { ERC1155Vault__factory } from "../../../src/types/factories/ERC1155Vault__factory";
import { getCreate2Address, getCreate2AddressERC1155 } from "../../shared/utils";

export function shouldBehaveLikeERC1155VaultFactory(): void {
  describe("View Functions", function () {
    describe("allVaultsLength", function () {
      context("when no vaults exist", function () {
        it("should return 0", async function () {
          expect(await this.contracts.erc1155VaultFactory.allVaultsLength()).to.equal("0");
        });
      });

      context("when vaults are created", function () {
        beforeEach(async function () {
          await this.contracts.erc1155VaultFactory.createVault(this.mocks.erc1155.address, "123");
        });

        it("should return the number of vaults", async function () {
          expect(await this.contracts.erc1155VaultFactory.allVaultsLength()).to.equal("1");
        });
      });
    });
  });

  describe("Effects Functions", function () {
    describe("createVault", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.erc1155VaultFactory.createVault(this.mocks.erc1155.address, "123");
          await expect(contractCall)
            .to.emit(this.contracts.erc1155VaultFactory, "CreateVault")
            .withArgs(
              this.mocks.erc1155.address,
              "123",
              getCreate2AddressERC1155(
                this.contracts.erc1155VaultFactory.address,
                this.mocks.erc1155.address,
                "123",
                ERC1155Vault__factory.bytecode,
              ),
            );
        });
      });
    });
  });
}
