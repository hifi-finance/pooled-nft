import { expect } from "chai";

export function shouldBehaveLikeVaultFactory(): void {
  describe("Effects Functions", function () {
    describe("createVault", function () {
      context("when called", function () {
        it("succeeds", async function () {
          const contractCall = this.contracts.vaultFactory.createVault(this.mocks.nft.address);
          await expect(contractCall).to.emit(this.contracts.vaultFactory, "CreateVault");
          // TODO: uncomment
          // .withArgs(
          //   "Mock NFT Vaulted",
          //   "MOCKv",
          //   this.mocks.nft.address,
          //   "0x10c7475e16e39a3ac1659D505eCed40fc96906F2",
          // );
        });
      });
    });
  });
}
