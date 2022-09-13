import { unitFixturePoolFactory } from "../../fixtures";
import { shouldBehaveLikePoolFactory } from "./PoolFactory.behavior";

export function unitTestPoolFactory(): void {
  describe("PoolFactory", function () {
    beforeEach(async function () {
      const { nft, poolFactory } = await this.loadFixture(unitFixturePoolFactory);
      this.mocks.nft = nft;
      this.contracts.poolFactory = poolFactory;
    });

    shouldBehaveLikePoolFactory();
  });
}
