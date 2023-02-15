import { unitFixtureERC1155PoolFactory } from "../../fixtures";
import { shouldBehaveLikeERC1155PoolFactory } from "./ERC1155PoolFactory.behavior";

export function unitTestERC1155PoolFactory(): void {
  describe("ERC1155PoolFactory", function () {
    beforeEach(async function () {
      const { erc1155, erc1155PoolFactory } = await this.loadFixture(unitFixtureERC1155PoolFactory);
      this.mocks.erc1155 = erc1155;
      this.contracts.erc1155PoolFactory = erc1155PoolFactory;
    });

    shouldBehaveLikeERC1155PoolFactory();
  });
}
