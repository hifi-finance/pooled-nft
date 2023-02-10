import { unitFixtureERC721Vault } from "../../fixtures";
import { shouldBehaveLikeERC721Vault } from "./ERC721Vault.behavior";

export function unitTestERC721Vault(): void {
  describe("ERC721Vault", function () {
    beforeEach(async function () {
      const { erc721, erc721Vault } = await this.loadFixture(unitFixtureERC721Vault);
      this.mocks.erc721 = erc721;
      this.contracts.erc721Vault = erc721Vault;
    });

    shouldBehaveLikeERC721Vault();
  });
}
