import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { V2Migrator } from "../../src/types/V2Migrator";
import { V2Migrator__factory } from "../../src/types/factories/V2Migrator__factory";
import {
  SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS,
  SUBTASK_VERIFY_VERIFY,
  TASK_DEPLOY_CONTRACT_V2_MIGRATOR,
} from "../constants";

task(TASK_DEPLOY_CONTRACT_V2_MIGRATOR)
  .addParam("v1PoolFactory", "The address of the v1PoolFactory contract")
  .addParam("v2PoolFactory", "The address of the v2PoolFactory contract")
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", false, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const v2MigratorFactory: V2Migrator__factory = new V2Migrator__factory(signers[0]);
    const v2Migrator: V2Migrator = <V2Migrator>(
      await v2MigratorFactory.deploy(taskArgs.v1PoolFactory, taskArgs.v2PoolFactory)
    );

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: v2Migrator,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "V2Migrator", address: v2Migrator.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY_VERIFY, {
          address: v2Migrator.address,
          constructorArguments: [taskArgs.v1PoolFactory, taskArgs.v2PoolFactory],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return v2Migrator.address;
  });
