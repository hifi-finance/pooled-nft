import { expect } from "chai";

export function shouldBehaveLikeVaultFactory(): void {
  describe("Effects Functions", function () {
    describe("createVault", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.vaultFactory.createVault("JPEG Vault", "vJPEG", this.mocks.nft.address);
          await expect(contractCall).to.emit(this.contracts.vaultFactory, "CreateVault");
        });
      });
    });
  });
}
