import { unitFixtureERC20Wnft } from "../../fixtures";
import { shouldBehaveLikeERC20Wnft } from "./ERC20Wnft.behavior";

export function unitTestERC20Wnft(): void {
  describe("ERC20Wnft", function () {
    beforeEach(async function () {
      const { erc20Wnft } = await this.loadFixture(unitFixtureERC20Wnft);
      this.contracts.erc20Wnft = erc20Wnft;
    });

    shouldBehaveLikeERC20Wnft();
  });
}
