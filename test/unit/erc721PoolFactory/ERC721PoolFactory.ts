import { unitFixtureERC721PoolFactory } from "../../fixtures";
import { shouldBehaveLikeERC721PoolFactory } from "./ERC721PoolFactory.behavior";

export function unitTestERC721PoolFactory(): void {
  describe("ERC721PoolFactory", function () {
    beforeEach(async function () {
      const { nft, erc721PoolFactory } = await this.loadFixture(unitFixtureERC721PoolFactory);
      this.mocks.nft = nft;
      this.contracts.erc721PoolFactory = erc721PoolFactory;
    });

    shouldBehaveLikeERC721PoolFactory();
  });
}
