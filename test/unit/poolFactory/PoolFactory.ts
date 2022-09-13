import { unitFixturePoolFactory } from "../../fixtures";
import { shouldBehaveLikePoolFactory } from "./PoolFactory.behavior";

export function unitTestPoolFactory(): void {
  describe("PoolFactory", function () {
    beforeEach(async function () {
      const { erc721, poolFactory } = await this.loadFixture(unitFixturePoolFactory);
      this.mocks.erc721 = erc721;
      this.contracts.poolFactory = poolFactory;
    });

    shouldBehaveLikePoolFactory();
  });
}
