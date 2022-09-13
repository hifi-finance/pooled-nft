import { AddressZero } from "@ethersproject/constants";
import { parseEther } from "@ethersproject/units";
import { expect } from "chai";

import { PoolErrors } from "../../errors";

export function shouldBehaveLikePool(): void {
  describe("Deployment", function () {
    it("should be deployed with the correct values", async function () {
      expect(await this.contracts.pool.name()).to.equal("JPEG Pool");
      expect(await this.contracts.pool.symbol()).to.equal("wJPEG");
      expect(await this.contracts.pool.asset()).to.equal(this.mocks.erc721.address);
    });
  });

  describe("View Functions", function () {
    describe("holdingAt", function () {
      context("when holdings set is empty", function () {
        it("reverts", async function () {
          await expect(this.contracts.pool.holdingAt("0")).to.be.reverted;
        });
      });

      context("when holdings set is not empty", function () {
        beforeEach(async function () {
          await this.contracts.pool.__godMode_setHoldings(["1", "2", "3"]);
        });

        it("returns the correct values", async function () {
          expect(await this.contracts.pool.holdingAt("0")).to.equal("1");
          expect(await this.contracts.pool.holdingAt("1")).to.equal("2");
          expect(await this.contracts.pool.holdingAt("2")).to.equal("3");
        });
      });
    });

    describe("holdingsLength", function () {
      context("when holdings set is empty", function () {
        it("returns the correct value", async function () {
          expect(await this.contracts.pool.holdingsLength()).to.be.equal("0");
        });
      });

      context("when holdings set is not empty", function () {
        beforeEach(async function () {
          await this.contracts.pool.__godMode_setHoldings(["1", "2", "3"]);
        });

        it("returns the correct value", async function () {
          expect(await this.contracts.pool.holdingsLength()).to.be.equal("3");
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
          await expect(
            this.contracts.pool.connect(this.signers.alice).mint(this.inIds, "0", this.to),
          ).to.be.revertedWith(PoolErrors.INSUFFICIENT_IN);
        });
      });

      context("when length of `inIds` given is not zero", function () {
        beforeEach(async function () {
          this.inIds = ["0", "1", "2"];
          this.to = this.signers.alice.address;
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.pool.address, "0").returns();
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.pool.address, "1").returns();
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.pool.address, "2").returns();
        });

        context("when length of `inIds` does not match `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = parseEther("4");
          });

          it("reverts", async function () {
            await expect(
              this.contracts.pool.connect(this.signers.alice).mint(this.inIds, this.outAmount, this.to),
            ).to.be.revertedWith(PoolErrors.IN_OUT_MISMATCH);
          });
        });

        context("when length of `inIds` matches `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = parseEther("3");
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.pool.connect(this.signers.alice).mint(this.inIds, this.outAmount, AddressZero),
              ).to.be.revertedWith(PoolErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.pool
                .connect(this.signers.alice)
                .mint(this.inIds, this.outAmount, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.pool, "Mint")
                .withArgs(this.inIds, this.outAmount, this.to);
              expect(await this.contracts.pool.balanceOf(this.to)).to.be.eq(this.outAmount);
              expect(await this.contracts.pool.holdingsLength()).to.be.equal("3");
              expect(await this.contracts.pool.holdingAt("0")).to.be.equal(this.inIds["0"]);
              expect(await this.contracts.pool.holdingAt("1")).to.be.equal(this.inIds["1"]);
              expect(await this.contracts.pool.holdingAt("2")).to.be.equal(this.inIds["2"]);
            });
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
            this.contracts.pool.connect(this.signers.alice).redeem(this.inAmount, [], this.to),
          ).to.be.revertedWith(PoolErrors.INSUFFICIENT_IN);
        });
      });

      context("when `inAmount` is not zero", function () {
        beforeEach(async function () {
          this.inAmount = parseEther("3");
          this.to = this.signers.alice.address;
          await this.contracts.pool.__godMode_mint(this.to, this.inAmount);
        });

        context("when `inAmount` does not match length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["0", "1", "2", "3"];
          });

          it("reverts", async function () {
            await expect(
              this.contracts.pool.connect(this.signers.alice).redeem(this.inAmount, this.outIds, this.to),
            ).to.be.revertedWith(PoolErrors.IN_OUT_MISMATCH);
          });
        });

        context("when `inAmount` matches length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["0", "1", "2"];
            this.to = this.signers.alice.address;
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.pool.address, this.to, "0").returns();
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.pool.address, this.to, "1").returns();
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.pool.address, this.to, "2").returns();
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.pool.connect(this.signers.alice).redeem(this.inAmount, this.outIds, AddressZero),
              ).to.be.revertedWith(PoolErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.pool
                .connect(this.signers.alice)
                .redeem(this.inAmount, this.outIds, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.pool, "Redeem")
                .withArgs(this.inAmount, this.outIds, this.to);
              expect(await this.contracts.pool.holdingsLength()).to.be.equal("0");
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
            this.contracts.pool.connect(this.signers.alice).swap(this.inIds, [], this.to),
          ).to.be.revertedWith(PoolErrors.INSUFFICIENT_IN);
        });
      });

      context("when length of `inIds` given is not zero", function () {
        beforeEach(async function () {
          this.inIds = ["0", "1", "2"];
          this.to = this.signers.alice.address;
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.pool.address, "0").returns();
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.pool.address, "1").returns();
          await this.mocks.erc721.mock.transferFrom.withArgs(this.to, this.contracts.pool.address, "2").returns();
        });

        context("when length of `inIds` does not match length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["3", "4", "5", "6"];
          });

          it("reverts", async function () {
            await expect(
              this.contracts.pool.connect(this.signers.alice).swap(this.inIds, this.outIds, this.to),
            ).to.be.revertedWith(PoolErrors.IN_OUT_MISMATCH);
          });
        });

        context("when length of `inIds` matches length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["3", "4", "5"];
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.pool.address, this.to, "3").returns();
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.pool.address, this.to, "4").returns();
            await this.mocks.erc721.mock.transferFrom.withArgs(this.contracts.pool.address, this.to, "5").returns();
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.pool.connect(this.signers.alice).swap(this.inIds, this.outIds, AddressZero),
              ).to.be.revertedWith(PoolErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.pool
                .connect(this.signers.alice)
                .swap(this.inIds, this.outIds, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.pool, "Swap")
                .withArgs(this.inIds, this.outIds, this.to);
              expect(await this.contracts.pool.holdingsLength()).to.be.equal("3");
              expect(await this.contracts.pool.holdingAt("0")).to.be.equal(this.inIds["0"]);
              expect(await this.contracts.pool.holdingAt("1")).to.be.equal(this.inIds["1"]);
              expect(await this.contracts.pool.holdingAt("2")).to.be.equal(this.inIds["2"]);
            });
          });
        });
      });
    });
  });
}
