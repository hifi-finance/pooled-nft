import { expect } from "chai";

import { ERC721Pool__factory } from "../../../src/types/factories/ERC721Pool__factory";
import { getCreate2Address } from "../../shared/utils";

export function shouldBehaveLikeERC721PoolFactory(): void {
  describe("View Functions", function () {
    describe("allPoolsLength", function () {
      context("when no pools exist", function () {
        it("should return 0", async function () {
          expect(await this.contracts.erc721PoolFactory.allPoolsLength()).to.equal("0");
        });
      });

      context("when pools are created", function () {
        beforeEach(async function () {
          await this.contracts.erc721PoolFactory.createPool(this.mocks.erc721.address);
        });

        it("should return the number of pools", async function () {
          expect(await this.contracts.erc721PoolFactory.allPoolsLength()).to.equal("1");
        });
      });
    });
  });

  describe("Effects Functions", function () {
    describe("createPool", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.erc721PoolFactory.createPool(this.mocks.erc721.address);
          await expect(contractCall)
            .to.emit(this.contracts.erc721PoolFactory, "CreatePool")
            .withArgs(
              "Mock NFT Pool",
              "MOCKp",
              this.mocks.erc721.address,
              getCreate2Address(
                this.contracts.erc721PoolFactory.address,
                this.mocks.erc721.address,
                ERC721Pool__factory.bytecode,
              ),
            );
        });
      });
    });
  });
}
