import { unitFixtureVaultFactory } from "../../fixtures";
import { shouldBehaveLikeVaultFactory } from "./VaultFactory.behavior";

export function unitTestVaultFactory(): void {
  describe("VaultFactory", function () {
    beforeEach(async function () {
      const { nft, vaultFactory } = await this.loadFixture(unitFixtureVaultFactory);
      this.mocks.nft = nft;
      this.contracts.vaultFactory = vaultFactory;
    });

    shouldBehaveLikeVaultFactory();
  });
}
