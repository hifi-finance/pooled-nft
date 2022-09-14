import { baseContext } from "../contexts";
import { unitTestPool } from "./pool/Pool";
import { unitTestPoolFactory } from "./poolFactory/PoolFactory";
import { unitTestVault } from "./vault/Vault";
import { unitTestVaultFactory } from "./vaultFactory/VaultFactory";

baseContext("Unit Tests", function () {
  unitTestPool();
  unitTestPoolFactory();
  unitTestVault();
  unitTestVaultFactory();
});
