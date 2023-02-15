import { unitFixtureERC1155Pool } from "../../fixtures";
import { shouldBehaveLikeERC1155Pool } from "./ERC1155Pool.behavior";

export function unitTestERC1155Pool(): void {
  describe("ERC1155Pool", function () {
    beforeEach(async function () {
      const { erc1155, erc1155Pool } = await this.loadFixture(unitFixtureERC1155Pool);
      this.mocks.erc1155 = erc1155;
      this.contracts.erc1155Pool = erc1155Pool;
    });

    shouldBehaveLikeERC1155Pool();
  });
}
