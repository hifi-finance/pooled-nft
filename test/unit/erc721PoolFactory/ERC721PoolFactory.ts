import { unitFixtureERC721PoolFactory } from "../../fixtures";
import { shouldBehaveLikeERC721PoolFactory } from "./ERC721PoolFactory.behavior";

export function unitTestERC721PoolFactory(): void {
  describe("ERC721PoolFactory", function () {
    beforeEach(async function () {
      const { erc721, erc721PoolFactory } = await this.loadFixture(unitFixtureERC721PoolFactory);
      this.mocks.erc721 = erc721;
      this.contracts.erc721PoolFactory = erc721PoolFactory;
    });

    shouldBehaveLikeERC721PoolFactory();
  });
}
