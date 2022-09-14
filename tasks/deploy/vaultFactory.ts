import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { VaultFactory } from "../../src/types/VaultFactory";
import { VaultFactory__factory } from "../../src/types/factories/VaultFactory__factory";
import {
  SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS,
  SUBTASK_VERIFY_VERIFY,
  TASK_DEPLOY_CONTRACT_VAULT_FACTORY,
} from "../constants";

task(TASK_DEPLOY_CONTRACT_VAULT_FACTORY)
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", false, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const vaultFactoryFactory: VaultFactory__factory = new VaultFactory__factory(signers[0]);
    const vaultFactory: VaultFactory = <VaultFactory>await vaultFactoryFactory.deploy();

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: vaultFactory,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "VaultFactory", address: vaultFactory.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY_VERIFY, {
          address: vaultFactory.address,
          constructorArguments: [],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return vaultFactory.address;
  });
