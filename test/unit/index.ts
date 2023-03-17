import { baseContext } from "../contexts";
import { unitTestERC20Wnft } from "./erc20Wnft/ERC20Wnft";
import { unitTestERC721Pool } from "./erc721Pool/ERC721Pool";
import { unitTestERC721PoolFactory } from "./erc721PoolFactory/ERC721PoolFactory";

baseContext("Unit Tests", function () {
  unitTestERC20Wnft();
  unitTestERC721Pool();
  unitTestERC721PoolFactory();
});
