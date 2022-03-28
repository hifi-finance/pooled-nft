import { unitFixtureVaultFactory } from "../../fixtures";
import { shouldBehaveLikeVaultFactory } from "./VaultFactory.behavior";

export function unitTestVaultFactory(): void {
  describe("VaultFactory", function () {
    beforeEach(async function () {
      const { erc721, vaultFactory } = await this.loadFixture(unitFixtureVaultFactory);
      this.mocks.erc721 = erc721;
      this.contracts.vaultFactory = vaultFactory;
    });

    shouldBehaveLikeVaultFactory();
  });
}
