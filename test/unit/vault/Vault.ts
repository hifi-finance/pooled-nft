import { unitFixtureVault } from "../../fixtures";
import { shouldBehaveLikeVault } from "./Vault.behavior";

export function unitTestVault(): void {
  describe("Vault", function () {
    beforeEach(async function () {
      const { nft, vault } = await this.loadFixture(unitFixtureVault);
      this.mocks.nft = nft;
      this.contracts.vault = vault;
    });

    shouldBehaveLikeVault();
  });
}
