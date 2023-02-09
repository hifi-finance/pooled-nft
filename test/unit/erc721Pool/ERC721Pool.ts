import { unitFixtureERC721Pool } from "../../fixtures";
import { shouldBehaveLikeERC721Pool } from "./ERC721Pool.behavior";

export function unitTestERC721Pool(): void {
  describe("ERC721Pool", function () {
    beforeEach(async function () {
      const { nft, erc721Pool } = await this.loadFixture(unitFixtureERC721Pool);
      this.mocks.nft = nft;
      this.contracts.erc721Pool = erc721Pool;
    });

    shouldBehaveLikeERC721Pool();
  });
}
