import { unitFixturePool } from "../../fixtures";
import { shouldBehaveLikePool } from "./Pool.behavior";

export function unitTestPool(): void {
  describe("Pool", function () {
    beforeEach(async function () {
      const { nft, pool } = await this.loadFixture(unitFixturePool);
      this.mocks.nft = nft;
      this.contracts.pool = pool;
    });

    shouldBehaveLikePool();
  });
}
