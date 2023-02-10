import { unitFixtureERC1155VaultFactory } from "../../fixtures";
import { shouldBehaveLikeERC1155VaultFactory } from "./ERC1155VaultFactory.behavior";

export function unitTestERC1155VaultFactory(): void {
  describe("ERC1155VaultFactory", function () {
    beforeEach(async function () {
      const { erc1155, erc1155VaultFactory } = await this.loadFixture(unitFixtureERC1155VaultFactory);
      this.mocks.erc1155 = erc1155;
      this.contracts.erc1155VaultFactory = erc1155VaultFactory;
    });

    shouldBehaveLikeERC1155VaultFactory();
  });
}
