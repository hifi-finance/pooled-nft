import { baseContext } from "../contexts";
import { unitTestERC20Wnft } from "./erc20Wnft/ERC20Wnft";
import { unitTestERC721Pool } from "./erc721Pool/ERC721Pool";
import { unitTestERC721PoolFactory } from "./erc721PoolFactory/ERC721PoolFactory";
import { unitTestERC721Vault } from "./erc721Vault/ERC721Vault";
import { unitTestERC721VaultFactory } from "./erc721VaultFactory/ERC721VaultFactory";
import { unitTestERC1155Pool } from "./erc1155Pool/ERC1155Pool";
import { unitTestERC1155PoolFactory } from "./erc1155PoolFactory/ERC1155PoolFactory";
import { unitTestERC1155Vault } from "./erc1155Vault/ERC1155Vault";
import { unitTestERC1155VaultFactory } from "./erc1155VaultFactory/ERC1155VaultFactory";

baseContext("Unit Tests", function () {
  unitTestERC20Wnft();
  unitTestERC721Pool();
  unitTestERC721PoolFactory();
  unitTestERC721Vault();
  unitTestERC721VaultFactory();
  unitTestERC1155Pool();
  unitTestERC1155PoolFactory();
  unitTestERC1155Vault();
  unitTestERC1155VaultFactory();
});
