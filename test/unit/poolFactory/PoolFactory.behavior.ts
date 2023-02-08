import { expect } from "chai";

import { Pool__factory } from "../../../src/types/factories/Pool__factory";
import { getCreate2Address } from "../../shared/utils";

export function shouldBehaveLikePoolFactory(): void {
  describe("View Functions", function () {
    describe("allPoolsLength", function () {
      context("when no vaults exist", function () {
        it("should return 0", async function () {
          expect(await this.contracts.poolFactory.allPoolsLength()).to.equal("0");
        });
      });

      context("when vaults are created", function () {
        beforeEach(async function () {
          await this.contracts.poolFactory.createPool(this.mocks.nft.address);
        });

        it("should return the number of vaults", async function () {
          expect(await this.contracts.poolFactory.allPoolsLength()).to.equal("1");
        });
      });
    });
  });

  describe("Effects Functions", function () {
    describe("createPool", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.poolFactory.createPool(this.mocks.nft.address);
          await expect(contractCall)
            .to.emit(this.contracts.poolFactory, "CreatePool")
            .withArgs(
              "Mock NFT Pooled",
              "MOCKp",
              this.mocks.nft.address,
              getCreate2Address(this.contracts.poolFactory.address, this.mocks.nft.address, Pool__factory.bytecode),
            );
        });
      });
    });
  });
}
