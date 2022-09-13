import { expect } from "chai";

export function shouldBehaveLikePoolFactory(): void {
  describe("Effects Functions", function () {
    describe("createPool", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.poolFactory.createPool("JPEG Pool", "pJPEG", this.mocks.nft.address);
          await expect(contractCall).to.emit(this.contracts.poolFactory, "CreatePool");
        });
      });
    });
  });
}
