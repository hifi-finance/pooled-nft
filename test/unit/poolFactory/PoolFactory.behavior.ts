import { expect } from "chai";

import { Pool__factory } from "../../../src/types/factories/Pool__factory";
import { getCreate2Address } from "../../shared/utils";

export function shouldBehaveLikePoolFactory(): void {
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
