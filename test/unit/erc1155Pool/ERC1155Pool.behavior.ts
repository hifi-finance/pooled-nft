import { AddressZero } from "@ethersproject/constants";
import { parseEther } from "@ethersproject/units";
import { expect } from "chai";
import hre from "hardhat";

import { ERC20WnftErrors, ERC1155PoolErrors } from "../../errors";
import { signERC2612Permit } from "../../shared/utils";

export function shouldBehaveLikeERC1155Pool(): void {
  describe("Deployment", function () {
    it("should be deployed with the correct values", async function () {
      expect(await this.contracts.erc1155Pool.asset()).to.equal(this.mocks.erc1155.address);
    });
  });

  describe("View Functions", function () {
    describe("holdings", function () {
      context("when no holdings exist", function () {
        it("returns 0", async function () {
          expect(await this.contracts.erc1155Pool.holdings()).to.equal("0");
        });
      });

      context("when holdings set is not empty", function () {
        beforeEach(async function () {
          await this.contracts.erc1155Pool.__godMode_setHoldings("12");
        });

        it("returns the correct values", async function () {
          expect(await this.contracts.erc1155Pool.holdings()).to.equal("12");
        });
      });
    });
  });

  describe("Effects Functions", function () {
    describe("mint", function () {
      context("when `inAmount` given is zero", function () {
        beforeEach(async function () {
          this.inAmount = "0";
          this.to = this.signers.alice.address;
        });

        it("reverts", async function () {
          await expect(
            this.contracts.erc1155Pool.connect(this.signers.alice).mint(this.inAmount, "0", this.to),
          ).to.be.revertedWith(ERC1155PoolErrors.INSUFFICIENT_IN);
        });
      });

      context("when `inAmount` given is not zero", function () {
        beforeEach(async function () {
          this.inAmount = "3";
          this.to = this.signers.alice.address;
          await this.mocks.erc1155.mock.safeTransferFrom
            .withArgs(
              this.to,
              this.contracts.erc1155Pool.address,
              await this.contracts.erc1155Pool.assetId(),
              this.inAmount,
              [],
            )
            .returns();
        });

        context("when `inAmount` does not match `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = parseEther("4");
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc1155Pool.connect(this.signers.alice).mint(this.inAmount, this.outAmount, this.to),
            ).to.be.revertedWith(ERC1155PoolErrors.IN_OUT_MISMATCH);
          });
        });

        context("when `inAmount` matches `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = parseEther("3");
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.erc1155Pool.connect(this.signers.alice).mint(this.inAmount, this.outAmount, AddressZero),
              ).to.be.revertedWith(ERC1155PoolErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.erc1155Pool
                .connect(this.signers.alice)
                .mint(this.inAmount, this.outAmount, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.erc1155Pool, "Mint")
                .withArgs(this.inAmount, this.outAmount, this.to);
              expect(await this.contracts.erc1155Pool.balanceOf(this.to)).to.be.eq(this.outAmount);
              expect(await this.contracts.erc1155Pool.holdings()).to.be.equal("3");
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
            this.contracts.erc1155Pool.connect(this.signers.alice).redeem(this.inAmount, "0", this.to),
          ).to.be.revertedWith(ERC1155PoolErrors.INSUFFICIENT_IN);
        });
      });

      context("when `inAmount` is not zero", function () {
        beforeEach(async function () {
          this.inAmount = parseEther("3");
          this.to = this.signers.alice.address;
          await this.contracts.erc1155Pool.__godMode_mint(this.to, this.inAmount);
        });

        context("when `inAmount` does not match `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = "4";
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc1155Pool.connect(this.signers.alice).redeem(this.inAmount, this.outAmount, this.to),
            ).to.be.revertedWith(ERC1155PoolErrors.IN_OUT_MISMATCH);
          });
        });

        context("when `inAmount` matches `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = "3";
            await this.contracts.erc1155Pool.__godMode_setHoldings(this.outAmount);
            this.to = this.signers.alice.address;
            await this.mocks.erc1155.mock.safeTransferFrom
              .withArgs(
                this.contracts.erc1155Pool.address,
                this.to,
                await this.contracts.erc1155Pool.assetId(),
                this.outAmount,
                [],
              )
              .returns();
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.erc1155Pool
                  .connect(this.signers.alice)
                  .redeem(this.inAmount, this.outAmount, AddressZero),
              ).to.be.revertedWith(ERC1155PoolErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.erc1155Pool
                .connect(this.signers.alice)
                .redeem(this.inAmount, this.outAmount, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.erc1155Pool, "Redeem")
                .withArgs(this.inAmount, this.outAmount, this.to);
              expect(await this.contracts.erc1155Pool.holdings()).to.be.equal("0");
            });
          });
        });
      });
    });
  });
}
