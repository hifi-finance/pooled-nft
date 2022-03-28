import { baseContext } from "../contexts";
import { unitTestVaultFactory } from "./vaultFactory/VaultFactory";

baseContext("Unit Tests", function () {
  unitTestVaultFactory();
});
