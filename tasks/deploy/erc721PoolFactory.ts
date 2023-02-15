import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { ERC721PoolFactory } from "../../src/types/ERC721PoolFactory";
import { ERC721PoolFactory__factory } from "../../src/types/factories/ERC721PoolFactory__factory";
import {
  SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS,
  SUBTASK_VERIFY_VERIFY,
  TASK_DEPLOY_CONTRACT_ERC721_POOL_FACTORY,
} from "../constants";

task(TASK_DEPLOY_CONTRACT_ERC721_POOL_FACTORY)
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", false, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const erc721PoolFactoryFactory: ERC721PoolFactory__factory = new ERC721PoolFactory__factory(signers[0]);
    const erc721PoolFactory: ERC721PoolFactory = <ERC721PoolFactory>await erc721PoolFactoryFactory.deploy();

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: erc721PoolFactory,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "ERC721PoolFactory", address: erc721PoolFactory.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY_VERIFY, {
          address: erc721PoolFactory.address,
          constructorArguments: [],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return erc721PoolFactory.address;
  });
