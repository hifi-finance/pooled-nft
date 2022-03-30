import { AddressZero } from "@ethersproject/constants";
import { parseEther } from "@ethersproject/units";
import { expect } from "chai";

import { VaultErrors } from "../../errors";

export function shouldBehaveLikeVault(): void {
  describe("Effects Functions", function () {
    describe("mint", function () {
      context("when length of `inIds` given is zero", function () {
        beforeEach(async function () {
          this.inIds = [];
        });

        it("reverts", async function () {
          await expect(
            this.contracts.vault.connect(this.signers.alice).mint(this.inIds, this.signers.alice.address),
          ).to.be.revertedWith(VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when length of `inIds` given is not zero", function () {
        beforeEach(async function () {
          await this.mocks.erc721.mock.transferFrom
            .withArgs(this.signers.alice.address, this.contracts.vault.address, "0")
            .returns();
          await this.mocks.erc721.mock.transferFrom
            .withArgs(this.signers.alice.address, this.contracts.vault.address, "1")
            .returns();
          await this.mocks.erc721.mock.transferFrom
            .withArgs(this.signers.alice.address, this.contracts.vault.address, "2")
            .returns();
          this.inIds = ["0", "1", "2"];
        });

        context("when `to` is the zero address", function () {
          it("reverts", async function () {
            await expect(
              this.contracts.vault.connect(this.signers.alice).mint(this.inIds, AddressZero),
            ).to.be.revertedWith(VaultErrors.INVALID_TO);
          });
        });

        context("when `to` is not the zero address", function () {
          it("succeeds", async function () {
            const contractCall = this.contracts.vault
              .connect(this.signers.alice)
              .mint(this.inIds, this.signers.alice.address);
            await expect(contractCall)
              .to.emit(this.contracts.vault, "Mint")
              .withArgs(this.inIds, this.signers.alice.address);
          });
        });
      });
    });

    describe("redeem", function () {
      context("when `inAmount` is zero", function () {
        beforeEach(async function () {
          this.inAmount = "0";
        });

        it("reverts", async function () {
          await expect(
            this.contracts.vault.connect(this.signers.alice).redeem(this.inAmount, [], this.signers.alice.address),
          ).to.be.revertedWith(VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when `inAmount` is not zero", function () {
        beforeEach(async function () {
          this.inAmount = parseEther("3");
          await this.contracts.vault.__godMode_mint(this.signers.alice.address, this.inAmount);
        });

        context("when `inAmount` does not match length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["0", "1", "2", "3"];
          });

          it("reverts", async function () {
            await expect(
              this.contracts.vault
                .connect(this.signers.alice)
                .redeem(this.inAmount, this.outIds, this.signers.alice.address),
            ).to.be.revertedWith(VaultErrors.IN_OUT_MISMATCH);
          });
        });

        context("when `inAmount` matches length of `outIds`", function () {
          beforeEach(async function () {
            await this.mocks.erc721.mock.transferFrom
              .withArgs(this.contracts.vault.address, this.signers.alice.address, "0")
              .returns();
            await this.mocks.erc721.mock.transferFrom
              .withArgs(this.contracts.vault.address, this.signers.alice.address, "1")
              .returns();
            await this.mocks.erc721.mock.transferFrom
              .withArgs(this.contracts.vault.address, this.signers.alice.address, "2")
              .returns();
            this.outIds = ["0", "1", "2"];
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.vault.connect(this.signers.alice).redeem(this.inAmount, this.outIds, AddressZero),
              ).to.be.revertedWith(VaultErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.vault
                .connect(this.signers.alice)
                .redeem(this.inAmount, this.outIds, this.signers.alice.address);
              await expect(contractCall)
                .to.emit(this.contracts.vault, "Redeem")
                .withArgs(this.inAmount, this.outIds, this.signers.alice.address);
            });
          });
        });
      });
    });

    describe("swap", function () {
      context("when length of `inIds` given is zero", function () {
        beforeEach(async function () {
          this.inIds = [];
        });

        it("reverts", async function () {
          await expect(
            this.contracts.vault.connect(this.signers.alice).swap(this.inIds, [], this.signers.alice.address),
          ).to.be.revertedWith(VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when length of `inIds` given is not zero", function () {
        beforeEach(async function () {
          await this.mocks.erc721.mock.transferFrom
            .withArgs(this.signers.alice.address, this.contracts.vault.address, "0")
            .returns();
          await this.mocks.erc721.mock.transferFrom
            .withArgs(this.signers.alice.address, this.contracts.vault.address, "1")
            .returns();
          await this.mocks.erc721.mock.transferFrom
            .withArgs(this.signers.alice.address, this.contracts.vault.address, "2")
            .returns();
          this.inIds = ["0", "1", "2"];
        });

        context("when length of `inIds` does not match length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["3", "4", "5", "6"];
          });

          it("reverts", async function () {
            await expect(
              this.contracts.vault
                .connect(this.signers.alice)
                .swap(this.inIds, this.outIds, this.signers.alice.address),
            ).to.be.revertedWith(VaultErrors.IN_OUT_MISMATCH);
          });
        });

        context("when length of `inIds` matches length of `outIds`", function () {
          beforeEach(async function () {
            await this.mocks.erc721.mock.transferFrom
              .withArgs(this.contracts.vault.address, this.signers.alice.address, "3")
              .returns();
            await this.mocks.erc721.mock.transferFrom
              .withArgs(this.contracts.vault.address, this.signers.alice.address, "4")
              .returns();
            await this.mocks.erc721.mock.transferFrom
              .withArgs(this.contracts.vault.address, this.signers.alice.address, "5")
              .returns();
            this.outIds = ["3", "4", "5"];
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.vault.connect(this.signers.alice).swap(this.inIds, this.outIds, AddressZero),
              ).to.be.revertedWith(VaultErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.vault
                .connect(this.signers.alice)
                .swap(this.inIds, this.outIds, this.signers.alice.address);
              await expect(contractCall)
                .to.emit(this.contracts.vault, "Swap")
                .withArgs(this.inIds, this.outIds, this.signers.alice.address);
            });
          });
        });
      });
    });
  });
}
