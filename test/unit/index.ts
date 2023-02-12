import { baseContext } from "../contexts";
import { unitTestERC20Wnft } from "./erc20Wnft/ERC20Wnft";
import { unitTestPool } from "./pool/Pool";
import { unitTestPoolFactory } from "./poolFactory/PoolFactory";
import { unitTestVault } from "./vault/Vault";
import { unitTestVaultFactory } from "./vaultFactory/VaultFactory";

baseContext("Unit Tests", function () {
  unitTestERC20Wnft();
  unitTestPool();
  unitTestPoolFactory();
  unitTestVault();
  unitTestVaultFactory();
});
