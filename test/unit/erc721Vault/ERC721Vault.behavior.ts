import { AddressZero } from "@ethersproject/constants";
import { parseEther } from "@ethersproject/units";
import { expect } from "chai";
import hre from "hardhat";

import { ERC20WnftErrors, ERC721VaultErrors } from "../../errors";
import { signERC2612Permit } from "../../shared/utils";

export function shouldBehaveLikeERC721Vault(): void {
  describe("Deployment", function () {
    it("should be deployed with the correct values", async function () {
      expect(await this.contracts.erc721Vault.name()).to.equal("JPEG Vaulted");
      expect(await this.contracts.erc721Vault.symbol()).to.equal("JPEGv");
      expect(await this.contracts.erc721Vault.asset()).to.equal(this.mocks.nft.address);
    });
  });

  describe("View Functions", function () {
    describe("holdingAt", function () {
      context("when holdings set is empty", function () {
        it("reverts", async function () {
          await expect(this.contracts.erc721Vault.holdingAt(AddressZero, "0")).to.be.reverted;
        });
      });

      context("when holdings set is not empty", function () {
        beforeEach(async function () {
          await this.contracts.erc721Vault.__godMode_setHoldings(this.signers.alice.address, ["1", "2", "3"]);
        });

        it("returns the correct values", async function () {
          expect(await this.contracts.erc721Vault.holdingAt(this.signers.alice.address, "0")).to.equal("1");
          expect(await this.contracts.erc721Vault.holdingAt(this.signers.alice.address, "1")).to.equal("2");
          expect(await this.contracts.erc721Vault.holdingAt(this.signers.alice.address, "2")).to.equal("3");
        });
      });
    });

    describe("holdingsLength", function () {
      context("when holdings set is empty", function () {
        it("returns the correct value", async function () {
          expect(await this.contracts.erc721Vault.holdingsLength(this.signers.alice.address)).to.be.equal("0");
        });
      });

      context("when holdings set is not empty", function () {
        beforeEach(async function () {
          await this.contracts.erc721Vault.__godMode_setHoldings(this.signers.alice.address, ["1", "2", "3"]);
        });

        it("returns the correct value", async function () {
          expect(await this.contracts.erc721Vault.holdingsLength(this.signers.alice.address)).to.be.equal("3");
        });
      });
    });
  });

  describe("Effects Functions", function () {
    describe("deposit", function () {
      context("when length of `inIds` given is zero", function () {
        beforeEach(async function () {
          this.inIds = [];
          this.to = this.signers.alice.address;
        });

        it("reverts", async function () {
          await expect(
            this.contracts.erc721Vault.connect(this.signers.alice).deposit(this.inIds, "0", this.to),
          ).to.be.revertedWith(ERC721VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when length of `inIds` given is not zero", function () {
        beforeEach(async function () {
          this.inIds = ["0", "1", "2"];
          this.to = this.signers.alice.address;
          await this.mocks.nft.mock.transferFrom.withArgs(this.to, this.contracts.erc721Vault.address, "0").returns();
          await this.mocks.nft.mock.transferFrom.withArgs(this.to, this.contracts.erc721Vault.address, "1").returns();
          await this.mocks.nft.mock.transferFrom.withArgs(this.to, this.contracts.erc721Vault.address, "2").returns();
        });

        context("when length of `inIds` does not match `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = parseEther("4");
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc721Vault.connect(this.signers.alice).deposit(this.inIds, this.outAmount, this.to),
            ).to.be.revertedWith(ERC721VaultErrors.IN_OUT_MISMATCH);
          });
        });

        context("when length of `inIds` matches `outAmount`", function () {
          beforeEach(async function () {
            this.outAmount = parseEther("3");
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.erc721Vault.connect(this.signers.alice).deposit(this.inIds, this.outAmount, AddressZero),
              ).to.be.revertedWith(ERC721VaultErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.erc721Vault
                .connect(this.signers.alice)
                .deposit(this.inIds, this.outAmount, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.erc721Vault, "Deposit")
                .withArgs(this.inIds, this.outAmount, this.to);
              expect(await this.contracts.erc721Vault.balanceOf(this.to)).to.be.eq(this.outAmount);
              expect(await this.contracts.erc721Vault.holdingsLength(this.signers.alice.address)).to.be.equal("3");
              expect(await this.contracts.erc721Vault.holdingAt(this.signers.alice.address, "0")).to.be.equal(
                this.inIds["0"],
              );
              expect(await this.contracts.erc721Vault.holdingAt(this.signers.alice.address, "1")).to.be.equal(
                this.inIds["1"],
              );
              expect(await this.contracts.erc721Vault.holdingAt(this.signers.alice.address, "2")).to.be.equal(
                this.inIds["2"],
              );
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
            this.contracts.erc721Vault.connect(this.signers.alice).withdraw(this.inAmount, [], this.to),
          ).to.be.revertedWith(ERC721VaultErrors.INSUFFICIENT_IN);
        });
      });

      context("when `inAmount` is not zero", function () {
        beforeEach(async function () {
          this.inAmount = parseEther("3");
          this.to = this.signers.alice.address;
          await this.contracts.erc721Vault.__godMode_mint(this.to, this.inAmount);
        });

        context("when `inAmount` does not match length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["0", "1", "2", "3"];
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc721Vault.connect(this.signers.alice).withdraw(this.inAmount, this.outIds, this.to),
            ).to.be.revertedWith(ERC721VaultErrors.IN_OUT_MISMATCH);
          });
        });

        context("when `inAmount` matches length of `outIds`", function () {
          beforeEach(async function () {
            this.outIds = ["0", "1", "2"];
            this.to = this.signers.alice.address;
            await this.mocks.nft.mock.transferFrom.withArgs(this.contracts.erc721Vault.address, this.to, "0").returns();
            await this.mocks.nft.mock.transferFrom.withArgs(this.contracts.erc721Vault.address, this.to, "1").returns();
            await this.mocks.nft.mock.transferFrom.withArgs(this.contracts.erc721Vault.address, this.to, "2").returns();
          });

          context("when `to` is the zero address", function () {
            it("reverts", async function () {
              await expect(
                this.contracts.erc721Vault
                  .connect(this.signers.alice)
                  .withdraw(this.inAmount, this.outIds, AddressZero),
              ).to.be.revertedWith(ERC721VaultErrors.INVALID_TO);
            });
          });

          context("when `to` is not the zero address", function () {
            it("succeeds", async function () {
              const contractCall = this.contracts.erc721Vault
                .connect(this.signers.alice)
                .withdraw(this.inAmount, this.outIds, this.to);
              await expect(contractCall)
                .to.emit(this.contracts.erc721Vault, "Withdraw")
                .withArgs(this.inAmount, this.outIds, this.to);
              expect(await this.contracts.erc721Vault.holdingsLength(this.signers.alice.address)).to.be.equal("0");
            });
          });
        });
      });
    });

    describe("withdrawWithSignature", function () {
      context("when permit is expired", function () {
        beforeEach(async function () {
          this.inAmount = "0";
          this.to = this.signers.alice.address;
          this.deadline = (await hre.ethers.provider.getBlock("latest")).timestamp;
          this.signature = await signERC2612Permit({
            provider: hre.ethers.provider as any,
            verifyingContract: this.contracts.erc721Vault.address,
            ownerAddress: this.signers.alice.address,
            spenderAddress: this.contracts.erc721Vault.address,
            amount: this.inAmount,
            deadline: this.deadline,
          });
        });

        it("reverts", async function () {
          await expect(
            this.contracts.erc721Vault
              .connect(this.signers.alice)
              .withdrawWithSignature(this.inAmount, [], this.to, this.deadline, this.signature),
          ).to.be.revertedWith(ERC20WnftErrors.PermitExpired);
        });
      });

      context("when permit is not expired", function () {
        context("when recovered address is invalid", function () {
          beforeEach(async function () {
            this.inAmount = "0";
            this.to = this.signers.alice.address;
            this.deadline = (await hre.ethers.provider.getBlock("latest")).timestamp + 100;
            this.signature = await signERC2612Permit({
              provider: hre.ethers.provider as any,
              verifyingContract: this.contracts.erc721Vault.address,
              ownerAddress: this.signers.bob.address,
              spenderAddress: this.contracts.erc721Vault.address,
              amount: this.inAmount,
              deadline: this.deadline,
            });
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc721Vault
                .connect(this.signers.alice)
                .withdrawWithSignature(this.inAmount, [], this.to, this.deadline, this.signature),
            ).to.be.revertedWith(ERC20WnftErrors.InvalidSignature);
          });
        });

        context("when recovered address is valid", function () {
          context("when `inAmount` is zero", function () {
            beforeEach(async function () {
              this.inAmount = "0";
              this.to = this.signers.alice.address;
              this.deadline = (await hre.ethers.provider.getBlock("latest")).timestamp + 100;
              this.signature = await signERC2612Permit({
                provider: hre.ethers.provider as any,
                verifyingContract: this.contracts.erc721Vault.address,
                ownerAddress: this.signers.alice.address,
                spenderAddress: this.contracts.erc721Vault.address,
                amount: this.inAmount,
                deadline: this.deadline,
              });
            });

            it("reverts", async function () {
              await expect(
                this.contracts.erc721Vault
                  .connect(this.signers.alice)
                  .withdrawWithSignature(this.inAmount, [], this.to, this.deadline, this.signature),
              ).to.be.revertedWith(ERC721VaultErrors.INSUFFICIENT_IN);
            });
          });

          context("when `inAmount` is not zero", function () {
            beforeEach(async function () {
              this.inAmount = parseEther("3");
              this.to = this.signers.alice.address;
              this.deadline = (await hre.ethers.provider.getBlock("latest")).timestamp + 100;
              this.signature = await signERC2612Permit({
                provider: hre.ethers.provider as any,
                verifyingContract: this.contracts.erc721Vault.address,
                ownerAddress: this.signers.alice.address,
                spenderAddress: this.contracts.erc721Vault.address,
                amount: this.inAmount,
                deadline: this.deadline,
              });
              await this.contracts.erc721Vault.__godMode_mint(this.to, this.inAmount);
            });

            context("when `inAmount` does not match length of `outIds`", function () {
              beforeEach(async function () {
                this.outIds = ["0", "1", "2", "3"];
              });

              it("reverts", async function () {
                await expect(
                  this.contracts.erc721Vault
                    .connect(this.signers.alice)
                    .withdrawWithSignature(this.inAmount, this.outIds, this.to, this.deadline, this.signature),
                ).to.be.revertedWith(ERC721VaultErrors.IN_OUT_MISMATCH);
              });
            });

            context("when `inAmount` matches length of `outIds`", function () {
              beforeEach(async function () {
                this.outIds = ["0", "1", "2"];
                this.to = this.signers.alice.address;
                await this.mocks.nft.mock.transferFrom
                  .withArgs(this.contracts.erc721Vault.address, this.to, "0")
                  .returns();
                await this.mocks.nft.mock.transferFrom
                  .withArgs(this.contracts.erc721Vault.address, this.to, "1")
                  .returns();
                await this.mocks.nft.mock.transferFrom
                  .withArgs(this.contracts.erc721Vault.address, this.to, "2")
                  .returns();
              });

              context("when `to` is the zero address", function () {
                it("reverts", async function () {
                  await expect(
                    this.contracts.erc721Vault
                      .connect(this.signers.alice)
                      .withdrawWithSignature(this.inAmount, this.outIds, AddressZero, this.deadline, this.signature),
                  ).to.be.revertedWith(ERC721VaultErrors.INVALID_TO);
                });
              });

              context("when `to` is not the zero address", function () {
                it("succeeds", async function () {
                  const contractCall = this.contracts.erc721Vault
                    .connect(this.signers.alice)
                    .withdrawWithSignature(this.inAmount, this.outIds, this.to, this.deadline, this.signature);
                  await expect(contractCall)
                    .to.emit(this.contracts.erc721Vault, "Withdraw")
                    .withArgs(this.inAmount, this.outIds, this.to);
                  expect(await this.contracts.erc721Vault.holdingsLength(this.signers.alice.address)).to.be.equal("0");
                });
              });
            });
          });
        });
      });
    });
  });
}
