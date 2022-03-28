import { expect } from "chai";

export function shouldBehaveLikeVaultFactory(): void {
  describe("Effects Functions", function () {
    describe("createVault", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.vaultFactory.createVault(
            "Wrapped NFT",
            "WNFT",
            this.mocks.erc721.address,
          );
          expect(contractCall).to.emit(this.contracts.vaultFactory, "CreateVault");
        });
      });
    });
  });
}
