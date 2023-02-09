import { unitFixtureERC721VaultFactory } from "../../fixtures";
import { shouldBehaveLikeERC721VaultFactory } from "./ERC721VaultFactory.behavior";

export function unitTestERC721VaultFactory(): void {
  describe("ERC721VaultFactory", function () {
    beforeEach(async function () {
      const { nft, erc721VaultFactory } = await this.loadFixture(unitFixtureERC721VaultFactory);
      this.mocks.nft = nft;
      this.contracts.erc721VaultFactory = erc721VaultFactory;
    });

    shouldBehaveLikeERC721VaultFactory();
  });
}
