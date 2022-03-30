import { baseContext } from "../contexts";
import { unitTestVault } from "./vault/Vault";
import { unitTestVaultFactory } from "./vaultFactory/VaultFactory";

baseContext("Unit Tests", function () {
  unitTestVault();
  unitTestVaultFactory();
});
