import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { PeripheralERC721Pool } from "../../src/types/PeripheralERC721Pool";
import { PeripheralERC721Pool__factory } from "../../src/types/factories/PeripheralERC721Pool__factory";
import {
  SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS,
  SUBTASK_VERIFY_VERIFY,
  TASK_DEPLOY_CONTRACT_PERIPHERAL_ERC721_POOL,
} from "../constants";

task(TASK_DEPLOY_CONTRACT_PERIPHERAL_ERC721_POOL)
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", false, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const peripheralErc721PoolFactory: PeripheralERC721Pool__factory = new PeripheralERC721Pool__factory(signers[0]);
    const peripheralErc721Pool: PeripheralERC721Pool = <PeripheralERC721Pool>await peripheralErc721PoolFactory.deploy();

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: peripheralErc721Pool,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "PeripheralErc721Pool", address: peripheralErc721Pool.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY_VERIFY, {
          address: peripheralErc721Pool.address,
          constructorArguments: [],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return peripheralErc721Pool.address;
  });
