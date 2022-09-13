import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PoolFactory } from "../../src/types/PoolFactory";
import { PoolFactory__factory } from "../../src/types/factories/PoolFactory__factory";
import {
  SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS,
  SUBTASK_VERIFY_VERIFY,
  TASK_DEPLOY_CONTRACT_POOL_FACTORY,
} from "../constants";

task(TASK_DEPLOY_CONTRACT_POOL_FACTORY)
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", false, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const poolFactoryFactory: PoolFactory__factory = new PoolFactory__factory(signers[0]);
    const poolFactory: PoolFactory = <PoolFactory>await poolFactoryFactory.deploy();

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: poolFactory,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "PoolFactory", address: poolFactory.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY_VERIFY, {
          address: poolFactory.address,
          constructorArguments: [],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return poolFactory.address;
  });
