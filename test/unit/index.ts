import { baseContext } from "../contexts";
import { unitTestPool } from "./pool/Pool";
import { unitTestPoolFactory } from "./poolFactory/PoolFactory";

baseContext("Unit Tests", function () {
  unitTestPool();
  unitTestPoolFactory();
});
