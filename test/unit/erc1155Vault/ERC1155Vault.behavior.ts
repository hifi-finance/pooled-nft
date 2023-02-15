import { AddressZero } from "@ethersproject/constants";
import { parseEther } from "@ethersproject/units";
import { expect } from "chai";
import hre from "hardhat";

import { ERC20WnftErrors, ERC1155VaultErrors } from "../../errors";

export function shouldBehaveLikeERC1155Vault(): void {
  describe("Deployment", function () {
    it("should be deployed with the correct values", async function () {
      expect(await this.contracts.erc1155Vault.asset()).to.equal(this.mocks.erc1155.address);
    });
  });

  describe("View Functions", function () {
    describe("holdingAt", function () {
      context("when holdings set is empty", function () {
        it("returns 0", async function () {
          expect(await this.contracts.erc1155Vault.holdingsFor(this.signers.alice.address)).to.equal("0");
        });
      });

      context("when holdings set is not empty", function () {
        beforeEach(async function () {
          await this.contracts.erc1155Vault.__godMode_setHoldings(this.signers.alice.address, "3");
        });

        it("returns the correct values", async function () {
          expect(await this.contracts.erc1155Vault.holdingsFor(this.signers.alice.address)).to.equal("3");
        });
      });
    });
  });

  describe("Effects Functions", function () {
    describe("deposit", function () {
      context("when length of `inIds` given is zero", function () {
        beforeEach(async function () {
          this.inAmount = "0";
          this.to = this.signers.alice.address;
        });

        it("reverts", async function () {
          await expect(
            this.contracts.erc1155Vault.connect(this.signers.alice).deposit(this.inAmount, "0", this.to),
          ).to.be.revertedWith(ERC1155VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when length of `inIds` given is not zero", function () {
        beforeEach(async function () {
          this.inAmount = "3";
          this.to = this.signers.alice.address;
          await this.mocks.erc1155.mock.safeTransferFrom
            .withArgs(
              this.to,
              this.contracts.erc1155Vault.address,
              await this.contracts.erc1155Vault.assetId(),
              this.inAmount,
              [],
            )
            .returns();
        });

        context("when length of `inIds` does not match `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = parseEther("4");
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc1155Vault.connect(this.signers.alice).deposit(this.inAmount, this.outAmount, this.to),
            ).to.be.revertedWith(ERC1155VaultErrors.IN_OUT_MISMATCH);
          });
        });

        context("when length of `inIds` matches `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = parseEther("3");
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.erc1155Vault
                  .connect(this.signers.alice)
                  .deposit(this.inAmount, this.outAmount, AddressZero),
              ).to.be.revertedWith(ERC1155VaultErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.erc1155Vault
                .connect(this.signers.alice)
                .deposit(this.inAmount, this.outAmount, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.erc1155Vault, "Deposit")
                .withArgs(this.inAmount, this.outAmount, this.to);
              expect(await this.contracts.erc1155Vault.balanceOf(this.to)).to.be.eq(this.outAmount);
              expect(await this.contracts.erc1155Vault.holdingsFor(this.signers.alice.address)).to.be.equal("3");
            });
          });
        });
      });
    });

    describe("withdraw", function () {
      context("when `inAmount` is zero", function () {
        beforeEach(async function () {
          this.inAmount = "0";
          this.to = this.signers.alice.address;
        });

        it("reverts", async function () {
          await expect(
            this.contracts.erc1155Vault.connect(this.signers.alice).withdraw(this.inAmount, "0", this.to),
          ).to.be.revertedWith(ERC1155VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when `inAmount` is not zero", function () {
        beforeEach(async function () {
          this.inAmount = parseEther("3");
          this.to = this.signers.alice.address;
          await this.contracts.erc1155Vault.__godMode_mint(this.to, this.inAmount);
        });

        context("when `inAmount` does not match length of `outIds`", function () {
          beforeEach(async function () {
            this.outAmount = "4";
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc1155Vault.connect(this.signers.alice).withdraw(this.inAmount, this.outAmount, this.to),
            ).to.be.revertedWith(ERC1155VaultErrors.IN_OUT_MISMATCH);
          });
        });

        context("when `inAmount` matches length of `outIds`", function () {
          beforeEach(async function () {
            this.outAmount = "3";
            this.to = this.signers.alice.address;
            await this.contracts.erc1155Vault.__godMode_setHoldings(this.to, this.outAmount);
            await this.mocks.erc1155.mock.safeTransferFrom
              .withArgs(
                this.contracts.erc1155Vault.address,
                this.to,
                await this.contracts.erc1155Vault.assetId(),
                this.outAmount,
                [],
              )
              .returns();
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.erc1155Vault
                  .connect(this.signers.alice)
                  .withdraw(this.inAmount, this.outAmount, AddressZero),
              ).to.be.revertedWith(ERC1155VaultErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.erc1155Vault
                .connect(this.signers.alice)
                .withdraw(this.inAmount, this.outAmount, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.erc1155Vault, "Withdraw")
                .withArgs(this.inAmount, this.outAmount, this.to);
              expect(await this.contracts.erc1155Vault.holdingsFor(this.signers.alice.address)).to.be.equal("0");
            });
          });
        });
      });
    });
  });
}
