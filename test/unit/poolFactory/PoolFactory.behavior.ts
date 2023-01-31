import { expect } from "chai";

export function shouldBehaveLikePoolFactory(): void {
  describe("Effects Functions", function () {
    describe("createPool", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.poolFactory.createPool(this.mocks.nft.address);
          await expect(contractCall).to.emit(this.contracts.poolFactory, "CreatePool");
          // TODO: uncomment
          // .withArgs(
          //   "Mock NFT Pooled",
          //   "MOCKp",
          //   this.mocks.nft.address,
          //   "0xEBf4722CF144A8f885d79FDDdf12e16D55e0A95A",
          // );
        });
      });
    });
  });
}
