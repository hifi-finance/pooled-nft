import { unitFixtureERC1155Vault } from "../../fixtures";
import { shouldBehaveLikeERC1155Vault } from "./ERC1155Vault.behavior";

export function unitTestERC1155Vault(): void {
  describe("ERC1155Vault", function () {
    beforeEach(async function () {
      const { erc1155, erc1155Vault } = await this.loadFixture(unitFixtureERC1155Vault);
      this.mocks.erc1155 = erc1155;
      this.contracts.erc1155Vault = erc1155Vault;
    });

    shouldBehaveLikeERC1155Vault();
  });
}
