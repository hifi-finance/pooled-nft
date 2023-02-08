import { AddressZero } from "@ethersproject/constants";
import { parseEther } from "@ethersproject/units";
import { expect } from "chai";
import { constants } from "ethers";
import hre from "hardhat";

import { ERC20WnftErrors, PoolErrors } from "../../errors";
import { signERC2612Permit } from "../../shared/utils";

export function shouldBehaveLikeERC20Wnft(): void {
  beforeEach(async function () {
    this.initialHolder = this.signers.alice.address;
    this.otherHolder = this.signers.bob.address;
    this.recipient = this.signers.carol.address;
    this.initialSupply = "100";
    await this.contracts.erc20Wnft.__godMode_mint(this.initialHolder, this.initialSupply);
  });

  describe("totalSupply", function () {
    it("returns the total amount of tokens", async function () {
      expect(await this.contracts.erc20Wnft.totalSupply()).to.be.equal(this.initialSupply);
    });
  });

  describe("balanceOf", function () {
    describe("when the requested account has no tokens", function () {
      it("returns zero", async function () {
        expect(await this.contracts.erc20Wnft.balanceOf(this.otherHolder)).to.be.equal("0");
      });
    });

    describe("when the requested account has some tokens", function () {
      it("returns the total amount of tokens", async function () {
        expect(await this.contracts.erc20Wnft.balanceOf(this.initialHolder)).to.be.equal(this.initialSupply);
      });
    });
  });

  describe("transfer", function () {
    beforeEach(async function () {
      this.from = this.initialHolder;
      this.to = this.recipient;
    });

    describe("when the sender does not have enough balance", function () {
      beforeEach(async function () {
        this.amount = "101";
      });

      it("reverts", async function () {
        await expect(
          this.contracts.erc20Wnft.connect(this.signers.alice).transfer(this.to, this.amount),
        ).to.be.revertedWith("0x11");
      });
    });

    describe("when the sender transfers all balance", function () {
      beforeEach(async function () {
        this.amount = "100";
      });

      it("transfers the requested amount", async function () {
        await this.contracts.erc20Wnft.connect(this.signers.alice).transfer(this.to, this.amount);

        expect(await this.contracts.erc20Wnft.balanceOf(this.from)).to.be.equal("0");

        expect(await this.contracts.erc20Wnft.balanceOf(this.to)).to.be.equal(this.amount);
      });

      it("emits a transfer event", async function () {
        await expect(this.contracts.erc20Wnft.connect(this.signers.alice).transfer(this.to, this.amount))
          .to.emit(this.contracts.erc20Wnft, "Transfer")
          .withArgs(this.from, this.to, this.amount);
      });
    });

    describe("when the sender transfers zero tokens", function () {
      beforeEach(async function () {
        this.amount = "0";
      });

      it("transfers the requested amount", async function () {
        await this.contracts.erc20Wnft.connect(this.signers.alice).transfer(this.to, this.amount);

        expect(await this.contracts.erc20Wnft.balanceOf(this.from)).to.be.equal("100");

        expect(await this.contracts.erc20Wnft.balanceOf(this.to)).to.be.equal("0");
      });

      it("emits a transfer event", async function () {
        await expect(this.contracts.erc20Wnft.connect(this.signers.alice).transfer(this.to, this.amount))
          .to.emit(this.contracts.erc20Wnft, "Transfer")
          .withArgs(this.from, this.to, this.amount);
      });
    });
  });

  describe("transferFrom", function () {
    beforeEach(async function () {
      this.spender = this.recipient;
      this.tokenOwner = this.initialHolder;
    });

    describe("when the recipient is not the zero address", function () {
      beforeEach(async function () {
        this.to = this.otherHolder;
      });

      describe("when the spender has enough allowance", function () {
        beforeEach(async function () {
          await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, this.initialSupply);
        });

        describe("when the token owner has enough balance", function () {
          beforeEach(async function () {
            this.amount = this.initialSupply;
          });

          it("transfers the requested amount", async function () {
            await this.contracts.erc20Wnft
              .connect(this.signers.carol)
              .transferFrom(this.tokenOwner, this.to, this.amount);

            expect(await this.contracts.erc20Wnft.balanceOf(this.tokenOwner)).to.be.equal("0");

            expect(await this.contracts.erc20Wnft.balanceOf(this.to)).to.be.equal(this.amount);
          });

          it("decreases the spender allowance", async function () {
            await this.contracts.erc20Wnft
              .connect(this.signers.carol)
              .transferFrom(this.tokenOwner, this.to, this.amount);

            expect(await this.contracts.erc20Wnft.allowance(this.tokenOwner, this.spender)).to.be.equal("0");
          });

          it("emits a transfer event", async function () {
            await expect(
              this.contracts.erc20Wnft.connect(this.signers.carol).transferFrom(this.tokenOwner, this.to, this.amount),
            )
              .to.emit(this.contracts.erc20Wnft, "Transfer")
              .withArgs(this.tokenOwner, this.to, this.amount);
          });
        });

        describe("when the token owner does not have enough balance", function () {
          beforeEach("reducing balance", async function () {
            this.amount = this.initialSupply;
            await this.contracts.erc20Wnft.connect(this.signers.alice).transfer(this.to, 1);
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc20Wnft.connect(this.signers.carol).transferFrom(this.tokenOwner, this.to, this.amount),
            ).to.be.revertedWith("0x11");
          });
        });
      });

      describe("when the spender does not have enough allowance", function () {
        beforeEach(async function () {
          this.allowance = "99";
          await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, this.allowance);
        });

        describe("when the token owner has enough balance", function () {
          beforeEach(async function () {
            this.amount = this.initialSupply;
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc20Wnft.connect(this.signers.carol).transferFrom(this.tokenOwner, this.to, this.amount),
            ).to.be.revertedWith("0x11");
          });
        });

        describe("when the token owner does not have enough balance", function () {
          beforeEach("reducing balance", async function () {
            this.amount = this.allowance;
            await this.contracts.erc20Wnft.connect(this.signers.alice).transfer(this.to, 2);
          });

          it("reverts", async function () {
            await expect(
              this.contracts.erc20Wnft.connect(this.signers.carol).transferFrom(this.tokenOwner, this.to, this.amount),
            ).to.be.revertedWith("0x11");
          });
        });
      });

      describe("when the spender has unlimited allowance", function () {
        beforeEach(async function () {
          await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, constants.MaxUint256);
        });

        it("does not decrease the spender allowance", async function () {
          await this.contracts.erc20Wnft.connect(this.signers.carol).transferFrom(this.tokenOwner, this.to, 1);

          expect(await this.contracts.erc20Wnft.allowance(this.tokenOwner, this.spender)).to.be.equal(
            constants.MaxUint256,
          );
        });

        it("does not emit an approval event", async function () {
          await expect(
            this.contracts.erc20Wnft.connect(this.signers.carol).transferFrom(this.tokenOwner, this.to, 1),
          ).to.not.emit(this.contracts.erc20Wnft, "Approval");
        });
      });
    });

    describe("approve", function () {
      describe("when the sender has enough balance", function () {
        beforeEach(async function () {
          this.amount = this.initialSupply;
        });

        it("emits an approval event", async function () {
          await expect(this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, this.amount))
            .to.emit(this.contracts.erc20Wnft, "Approval")
            .withArgs(this.tokenOwner, this.spender, this.amount);
        });

        describe("when there was no approved amount before", function () {
          it("approves the requested amount", async function () {
            await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, this.amount);

            expect(await this.contracts.erc20Wnft.allowance(this.tokenOwner, this.spender)).to.be.equal(this.amount);
          });
        });

        describe("when the spender had an approved amount", function () {
          beforeEach(async function () {
            await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, 1);
          });

          it("approves the requested amount and replaces the previous one", async function () {
            await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, this.amount);

            expect(await this.contracts.erc20Wnft.allowance(this.tokenOwner, this.spender)).to.be.equal(this.amount);
          });
        });
      });

      describe("when the sender does not have enough balance", function () {
        beforeEach(async function () {
          this.amount = "101";
        });

        it("emits an approval event", async function () {
          await expect(this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, this.amount))
            .to.emit(this.contracts.erc20Wnft, "Approval")
            .withArgs(this.tokenOwner, this.spender, this.amount);
        });

        describe("when there was no approved amount before", function () {
          it("approves the requested amount", async function () {
            await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, this.amount);

            expect(await this.contracts.erc20Wnft.allowance(this.tokenOwner, this.spender)).to.be.equal(this.amount);
          });
        });

        describe("when the spender had an approved amount", function () {
          beforeEach(async function () {
            await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, 1);
          });

          it("approves the requested amount and replaces the previous one", async function () {
            await this.contracts.erc20Wnft.connect(this.signers.alice).approve(this.spender, this.amount);

            expect(await this.contracts.erc20Wnft.allowance(this.tokenOwner, this.spender)).to.be.equal(this.amount);
          });
        });
      });
    });
  });
}
