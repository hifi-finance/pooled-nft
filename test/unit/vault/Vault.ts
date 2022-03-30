import { unitFixtureVault } from "../../fixtures";
import { shouldBehaveLikeVault } from "./Vault.behavior";

export function unitTestVault(): void {
  describe("Vault", function () {
    beforeEach(async function () {
      const { erc721, vault } = await this.loadFixture(unitFixtureVault);
      this.mocks.erc721 = erc721;
      this.contracts.vault = vault;
    });

    shouldBehaveLikeVault();
  });
}
