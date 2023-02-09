import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { ERC721VaultFactory } from "../../src/types/ERC721VaultFactory";
import { ERC721VaultFactory__factory } from "../../src/types/factories/ERC721VaultFactory__factory";
import {
  SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS,
  SUBTASK_VERIFY_VERIFY,
  TASK_DEPLOY_CONTRACT_ERC721_VAULT_FACTORY,
} from "../constants";

task(TASK_DEPLOY_CONTRACT_ERC721_VAULT_FACTORY)
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", false, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const erc721VaultFactoryFactory: ERC721VaultFactory__factory = new ERC721VaultFactory__factory(signers[0]);
    const erc721VaultFactory: ERC721VaultFactory = <ERC721VaultFactory>await erc721VaultFactoryFactory.deploy();

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: erc721VaultFactory,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "ERC721VaultFactory", address: erc721VaultFactory.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY_VERIFY, {
          address: erc721VaultFactory.address,
          constructorArguments: [],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return erc721VaultFactory.address;
  });
