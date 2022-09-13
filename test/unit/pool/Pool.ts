import { unitFixturePool } from "../../fixtures";
import { shouldBehaveLikePool } from "./Pool.behavior";

export function unitTestPool(): void {
  describe("Pool", function () {
    beforeEach(async function () {
      const { erc721, pool } = await this.loadFixture(unitFixturePool);
      this.mocks.erc721 = erc721;
      this.contracts.pool = pool;
    });

    shouldBehaveLikePool();
  });
}
