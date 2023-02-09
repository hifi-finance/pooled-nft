import { baseContext } from "../contexts";
import { unitTestERC20Wnft } from "./erc20Wnft/ERC20Wnft";
import { unitTestERC721Pool } from "./erc721Pool/ERC721Pool";
import { unitTestERC721PoolFactory } from "./erc721PoolFactory/ERC721PoolFactory";
import { unitTestERC721Vault } from "./erc721Vault/ERC721Vault";
import { unitTestERC721VaultFactory } from "./erc721VaultFactory/ERC721VaultFactory";

baseContext("Unit Tests", function () {
  unitTestERC20Wnft();
  unitTestERC721Pool();
  unitTestERC721PoolFactory();
  unitTestERC721Vault();
  unitTestERC721VaultFactory();
});
