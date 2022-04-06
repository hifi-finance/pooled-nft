import { AddressZero } from "@ethersproject/constants";
import { parseEther } from "@ethersproject/units";
import { expect } from "chai";

import { VaultErrors } from "../../errors";

export function shouldBehaveLikeVault(): void {
  describe("Deployment", function () {
    it("should be deployed with the correct values", async function () {
      expect(await this.contracts.vault.name()).to.equal("JPEG Vault");
      expect(await this.contracts.vault.symbol()).to.equal("wJPEG");
      expect(await this.contracts.vault.asset()).to.equal(this.mocks.erc721.address);
    });
  });

  describe("View Functions", function () {
    describe("holdingAt", function () {
      context("when holdings set is empty", function () {
        it("reverts", async function () {
          await expect(this.contracts.vault.holdingAt("0")).to.be.reverted;
        });
      });

      context("when holdings set is not empty", function () {
        beforeEach(async function () {
          await this.contracts.vault.__godMode_setHoldings(["1", "2", "3"]);
        });

        it("returns the correct values", async function () {
          expect(await this.contracts.vault.holdingAt("0")).to.equal("1");
          expect(await this.contracts.vault.holdingAt("1")).to.equal("2");
          expect(await this.contracts.vault.holdingAt("2")).to.equal("3");
        });
      });
    });

    describe("holdingsLength", function () {
      context("when holdings set is empty", function () {
        it("returns the correct value", async function () {
          expect(await this.contracts.vault.holdingsLength()).to.be.equal("0");
        });
      });

      context("when holdings set is not empty", function () {
        beforeEach(async function () {
          await this.contracts.vault.__godMode_setHoldings(["1", "2", "3"]);
        });

        it("returns the correct value", async function () {
          expect(await this.contracts.vault.holdingsLength()).to.be.equal("3");
        });
      });
    });
  });

  describe("Effects Functions", function () {
    describe("mint", function () {
      context("when length of `inIds` given is zero", function () {
        beforeEach(async function () {
          this.inIds = [];
          this.to = this.signers.alice.address;
        });

        it("reverts", async function () {
          await expect(this.contracts.vault.connect(this.signers.alice).mint(this.inIds, this.to)).to.be.revertedWith(
            VaultErrors.INSUFFICIENT_IN,
          );
        });
      });

      context("when length of `inIds` given is not zero", function () {
        beforeEach(async function () {
          this.inIds = ["0", "1", "2"];
          this.to = this.signers.alice.address;
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.vault.address, "0").returns();
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.vault.address, "1").returns();
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.vault.address, "2").returns();
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
            const contractCall = this.contracts.vault.connect(this.signers.alice).mint(this.inIds, this.to);
            await expect(contractCall).to.emit(this.contracts.vault, "Mint").withArgs(this.inIds, this.to);
            expect(await this.contracts.vault.balanceOf(this.to)).to.be.eq(parseEther("3"));
            expect(await this.contracts.vault.holdingsLength()).to.be.equal("3");
            expect(await this.contracts.vault.holdingAt("0")).to.be.equal(this.inIds["0"]);
            expect(await this.contracts.vault.holdingAt("1")).to.be.equal(this.inIds["1"]);
            expect(await this.contracts.vault.holdingAt("2")).to.be.equal(this.inIds["2"]);
          });
        });
      });
    });

    describe("redeem", function () {
      context("when `inAmount` is zero", function () {
        beforeEach(async function () {
          this.inAmount = "0";
          this.to = this.signers.alice.address;
        });

        it("reverts", async function () {
          await expect(
            this.contracts.vault.connect(this.signers.alice).redeem(this.inAmount, [], this.to),
          ).to.be.revertedWith(VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when `inAmount` is not zero", function () {
        beforeEach(async function () {
          this.inAmount = parseEther("3");
          this.to = this.signers.alice.address;
          await this.contracts.vault.__godMode_mint(this.to, this.inAmount);
        });

        context("when `inAmount` does not match length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["0", "1", "2", "3"];
          });

          it("reverts", async function () {
            await expect(
              this.contracts.vault.connect(this.signers.alice).redeem(this.inAmount, this.outIds, this.to),
            ).to.be.revertedWith(VaultErrors.IN_OUT_MISMATCH);
          });
        });

        context("when `inAmount` matches length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["0", "1", "2"];
            this.to = this.signers.alice.address;
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.vault.address, this.to, "0").returns();
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.vault.address, this.to, "1").returns();
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.vault.address, this.to, "2").returns();
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
                .redeem(this.inAmount, this.outIds, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.vault, "Redeem")
                .withArgs(this.inAmount, this.outIds, this.to);
              expect(await this.contracts.vault.holdingsLength()).to.be.equal("0");
            });
          });
        });
      });
    });

    describe("swap", function () {
      context("when length of `inIds` given is zero", function () {
        beforeEach(async function () {
          this.inIds = [];
          this.to = this.signers.alice.address;
        });

        it("reverts", async function () {
          await expect(
            this.contracts.vault.connect(this.signers.alice).swap(this.inIds, [], this.to),
          ).to.be.revertedWith(VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when length of `inIds` given is not zero", function () {
        beforeEach(async function () {
          this.inIds = ["0", "1", "2"];
          this.to = this.signers.alice.address;
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.vault.address, "0").returns();
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.vault.address, "1").returns();
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.vault.address, "2").returns();
        });

        context("when length of `inIds` does not match length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["3", "4", "5", "6"];
            this.to = this.signers.alice.address;
          });

          it("reverts", async function () {
            await expect(
              this.contracts.vault.connect(this.signers.alice).swap(this.inIds, this.outIds, this.to),
            ).to.be.revertedWith(VaultErrors.IN_OUT_MISMATCH);
          });
        });

        context("when length of `inIds` matches length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["3", "4", "5"];
            this.to = this.signers.alice.address;
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.vault.address, this.to, "3").returns();
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.vault.address, this.to, "4").returns();
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.vault.address, this.to, "5").returns();
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
                .swap(this.inIds, this.outIds, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.vault, "Swap")
                .withArgs(this.inIds, this.outIds, this.to);
              expect(await this.contracts.vault.holdingsLength()).to.be.equal("3");
              expect(await this.contracts.vault.holdingAt("0")).to.be.equal(this.inIds["0"]);
              expect(await this.contracts.vault.holdingAt("1")).to.be.equal(this.inIds["1"]);
              expect(await this.contracts.vault.holdingAt("2")).to.be.equal(this.inIds["2"]);
            });
          });
        });
      });
    });
  });
}
