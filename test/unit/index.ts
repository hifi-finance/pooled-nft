import { baseContext } from "../contexts";
import { unitTestERC20Wnft } from "./erc20Wnft/ERC20Wnft";
import { unitTestERC721PoolFactory } from "./erc721PoolFactory/ERC721PoolFactory";
import { unitTestERC721VaultFactory } from "./erc721VaultFactory/ERC721VaultFactory";
import { unitTestPool } from "./pool/Pool";
import { unitTestVault } from "./vault/Vault";

baseContext("Unit Tests", function () {
  unitTestERC20Wnft();
  unitTestPool();
  unitTestERC721PoolFactory();
  unitTestVault();
  unitTestERC721VaultFactory();
});
