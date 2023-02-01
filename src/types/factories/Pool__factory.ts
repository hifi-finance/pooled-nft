/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Pool, PoolInterface } from "../Pool";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ERC20Wnft__Forbidden",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC20Wnft__InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC20Wnft__PermitExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "Pool__InOutMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "Pool__InsufficientIn",
    type: "error",
  },
  {
    inputs: [],
    name: "Pool__InvalidTo",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "Initialize",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "inIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "inAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "outIds",
        type: "uint256[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Redeem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "inIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "outIds",
        type: "uint256[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "holdingAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "holdingsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address",
        name: "asset_",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "inIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "outAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "inAmount",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "outIds",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "inIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "outIds",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50336080526080516118bb6100376000396000818161030a015261041e01526118bb6000f3fe608060405234801561001057600080fd5b50600436106101775760003560e01c806370a08231116100d8578063afee80d91161008c578063d505accf11610066578063d505accf1461033f578063dd62ed3e14610352578063e037a2c71461037d57600080fd5b8063afee80d9146102f2578063c45a015514610305578063c4c9741b1461032c57600080fd5b806395d89b41116100bd57806395d89b41146102c4578063a3ff19a4146102cc578063a9059cbb146102df57600080fd5b806370a08231146102845780637ecebe00146102a457600080fd5b806323b872dd1161012f578063313ce56711610114578063313ce567146102365780633644e5151461025057806338d52e0f1461025957600080fd5b806323b872dd146101fc57806330adf81f1461020f57600080fd5b8063095ea7b311610160578063095ea7b3146101af57806318160ddd146101d257806322f5ac02146101e957600080fd5b806306fdde031461017c578063077f224a1461019a575b600080fd5b610184610385565b60405161019191906111b0565b60405180910390f35b6101ad6101a83660046112c4565b610413565b005b6101c26101bd366004611338565b6105b5565b6040519015158152602001610191565b6101db60005481565b604051908152602001610191565b6101ad6101f73660046113ae565b6105cc565b6101c261020a36600461140b565b610741565b6101db7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b61023e601281565b60405160ff9091168152602001610191565b6101db60055481565b60075461026c906001600160a01b031681565b6040516001600160a01b039091168152602001610191565b6101db610292366004611447565b60016020526000908152604090205481565b6101db6102b2366004611447565b60066020526000908152604090205481565b6101846107d6565b6101ad6102da366004611462565b6107e3565b6101c26102ed366004611338565b6109ed565b6101db6103003660046114e3565b6109fa565b61026c7f000000000000000000000000000000000000000000000000000000000000000081565b6101ad61033a3660046114fc565b610a07565b6101ad61034d36600461154f565b610b7d565b6101db6103603660046115c2565b600260209081526000928352604080842090915290825290205481565b6101db610d3e565b60038054610392906115f5565b80601f01602080910402602001604051908101604052809291908181526020018280546103be906115f5565b801561040b5780601f106103e05761010080835404028352916020019161040b565b820191906000526020600020905b8154815290600101906020018083116103ee57829003601f168201915b505050505081565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461045c57604051632dc9a2c560e11b815260040160405180910390fd5b825161046f906003906020860190611117565b508151610483906004906020850190611117565b50600780547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03831617905560405146907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f906104ea9060039061162f565b60408051918290038220828201825260018352603160f81b6020938401528151928301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66060820152608081018290523060a082015260c00160408051601f198184030181529082905280516020909101206005556007546001600160a01b0316907f1ad5258fd94fd6ce147b9bf86c9fa73f75ad24a4838ae307465cb85e4f88a892906105a790600390600490611718565b60405180910390a250505050565b60006105c2338484610d4f565b5060015b92915050565b60008390036105ee5760405163a5dead6960e01b815260040160405180910390fd5b8161060184670de0b6b3a764000061175c565b1461061f5760405163612251c760e11b815260040160405180910390fd5b6001600160a01b0381166106465760405163ab0f9cf760e01b815260040160405180910390fd5b60005b838110156106f95760008585838181106106655761066561177b565b905060200201359050610682816008610db190919063ffffffff16565b506007546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd90606401600060405180830381600087803b1580156106d557600080fd5b505af11580156106e9573d6000803e3d6000fd5b5050505081600101915050610649565b506107048183610dc4565b806001600160a01b03167f2b4219bb15d2e4804fa97f7e2a708d59ff50ece96eb684a05f3b12cb6c40a2d08585856040516105a7939291906117e0565b6001600160a01b0383166000908152600260209081526040808320338452909152812054600019146107c1576001600160a01b038416600090815260026020908152604080832033845290915290205461079c908390611804565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b6107cc848484610e55565b5060019392505050565b60048054610392906115f5565b60008490036108055760405163a5dead6960e01b815260040160405180910390fd5b8382146108255760405163612251c760e11b815260040160405180910390fd5b6001600160a01b03811661084c5760405163ab0f9cf760e01b815260040160405180910390fd5b60005b8481101561099e57600086868381811061086b5761086b61177b565b905060200201359050610888816008610db190919063ffffffff16565b506007546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd90606401600060405180830381600087803b1580156108db57600080fd5b505af11580156108ef573d6000803e3d6000fd5b5050505060008585848181106109075761090761177b565b905060200201359050610924816008610efd90919063ffffffff16565b506007546040516323b872dd60e01b81523060048201526001600160a01b03868116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b15801561097957600080fd5b505af115801561098d573d6000803e3d6000fd5b50505050826001019250505061084f565b50806001600160a01b03167f0482325a8e0d87a795f1b932f4864348776133a209264b40b05b9a428dcd799b868686866040516109de949392919061181b565b60405180910390a25050505050565b60006105c2338484610e55565b60006105c6600883610f09565b83600003610a285760405163a5dead6960e01b815260040160405180910390fd5b610a3a82670de0b6b3a764000061175c565b8414610a595760405163612251c760e11b815260040160405180910390fd5b6001600160a01b038116610a805760405163ab0f9cf760e01b815260040160405180910390fd5b610a8a3385610f15565b60005b82811015610b3f576000848483818110610aa957610aa961177b565b905060200201359050610ac6816008610efd90919063ffffffff16565b506007546040516323b872dd60e01b81523060048201526001600160a01b03858116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b158015610b1b57600080fd5b505af1158015610b2f573d6000803e3d6000fd5b5050505081600101915050610a8d565b50806001600160a01b03167f4a9f43dc50f4433ceaad8dd954b2eb7ab081462d4e95eedfc853d76840d766428585856040516105a79392919061184d565b42841015610b9e57604051639436330960e01b815260040160405180910390fd5b6005546001600160a01b038816600090815260066020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b919087610bf183611867565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e00160405160208183030381529060405280519060200120604051602001610c6a92919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015610cd5573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381161580610d0a5750886001600160a01b0316816001600160a01b031614155b15610d285760405163068d22f760e11b815260040160405180910390fd5b610d33898989610d4f565b505050505050505050565b6000610d4a6008610fa1565b905090565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6000610dbd8383610fab565b9392505050565b80600054610dd29190611880565b60009081556001600160a01b038316815260016020526040902054610df8908290611880565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610e499085815260200190565b60405180910390a35050565b6001600160a01b038316600090815260016020526040902054610e79908290611804565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610ea9908290611880565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610da49085815260200190565b6000610dbd8383610ffa565b6000610dbd83836110ed565b6001600160a01b038216600090815260016020526040902054610f39908290611804565b6001600160a01b03831660009081526001602052604081209190915554610f61908290611804565b60009081556040518281526001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610e49565b60006105c6825490565b6000818152600183016020526040812054610ff2575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556105c6565b5060006105c6565b600081815260018301602052604081205480156110e357600061101e600183611804565b855490915060009061103290600190611804565b90508181146110975760008660000182815481106110525761105261177b565b90600052602060002001549050808760000184815481106110755761107561177b565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806110a8576110a8611898565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506105c6565b60009150506105c6565b60008260000182815481106111045761110461177b565b9060005260206000200154905092915050565b828054611123906115f5565b90600052602060002090601f016020900481019282611145576000855561118b565b82601f1061115e57805160ff191683800117855561118b565b8280016001018555821561118b579182015b8281111561118b578251825591602001919060010190611170565b5061119792915061119b565b5090565b5b80821115611197576000815560010161119c565b600060208083528351808285015260005b818110156111dd578581018301518582016040015282016111c1565b818111156111ef576000604083870101525b50601f01601f1916929092016040019392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261122c57600080fd5b813567ffffffffffffffff8082111561124757611247611205565b604051601f8301601f19908116603f0116810190828211818310171561126f5761126f611205565b8160405283815286602085880101111561128857600080fd5b836020870160208301376000602085830101528094505050505092915050565b80356001600160a01b03811681146112bf57600080fd5b919050565b6000806000606084860312156112d957600080fd5b833567ffffffffffffffff808211156112f157600080fd5b6112fd8783880161121b565b9450602086013591508082111561131357600080fd5b506113208682870161121b565b92505061132f604085016112a8565b90509250925092565b6000806040838503121561134b57600080fd5b611354836112a8565b946020939093013593505050565b60008083601f84011261137457600080fd5b50813567ffffffffffffffff81111561138c57600080fd5b6020830191508360208260051b85010111156113a757600080fd5b9250929050565b600080600080606085870312156113c457600080fd5b843567ffffffffffffffff8111156113db57600080fd5b6113e787828801611362565b90955093505060208501359150611400604086016112a8565b905092959194509250565b60008060006060848603121561142057600080fd5b611429846112a8565b9250611437602085016112a8565b9150604084013590509250925092565b60006020828403121561145957600080fd5b610dbd826112a8565b60008060008060006060868803121561147a57600080fd5b853567ffffffffffffffff8082111561149257600080fd5b61149e89838a01611362565b909750955060208801359150808211156114b757600080fd5b506114c488828901611362565b90945092506114d79050604087016112a8565b90509295509295909350565b6000602082840312156114f557600080fd5b5035919050565b6000806000806060858703121561151257600080fd5b84359350602085013567ffffffffffffffff81111561153057600080fd5b61153c87828801611362565b90945092506114009050604086016112a8565b600080600080600080600060e0888a03121561156a57600080fd5b611573886112a8565b9650611581602089016112a8565b95506040880135945060608801359350608088013560ff811681146115a557600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156115d557600080fd5b6115de836112a8565b91506115ec602084016112a8565b90509250929050565b600181811c9082168061160957607f821691505b60208210810361162957634e487b7160e01b600052602260045260246000fd5b50919050565b600080835461163d816115f5565b60018281168015611655576001811461166657611695565b60ff19841687528287019450611695565b8760005260208060002060005b8581101561168c5781548a820152908401908201611673565b50505082870194505b50929695505050505050565b600081546116ae816115f5565b8085526020600183811680156116cb57600181146116df5761170d565b60ff1985168884015260408801955061170d565b866000528260002060005b858110156117055781548a82018601529083019084016116ea565b890184019650505b505050505092915050565b60408152600061172b60408301856116a1565b828103602084015261173d81856116a1565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561177657611776611746565b500290565b634e487b7160e01b600052603260045260246000fd5b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8311156117c357600080fd5b8260051b8083602087013760009401602001938452509192915050565b6040815260006117f4604083018587611791565b9050826020830152949350505050565b60008282101561181657611816611746565b500390565b60408152600061182f604083018688611791565b8281036020840152611842818587611791565b979650505050505050565b83815260406020820152600061173d604083018486611791565b60006001820161187957611879611746565b5060010190565b6000821982111561189357611893611746565b500190565b634e487b7160e01b600052603160045260246000fdfea164736f6c634300080d000a";

type PoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Pool__factory extends ContractFactory {
  constructor(...args: PoolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Pool";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Pool> {
    return super.deploy(overrides || {}) as Promise<Pool>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Pool {
    return super.attach(address) as Pool;
  }
  connect(signer: Signer): Pool__factory {
    return super.connect(signer) as Pool__factory;
  }
  static readonly contractName: "Pool";
  public readonly contractName: "Pool";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PoolInterface {
    return new utils.Interface(_abi) as PoolInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Pool {
    return new Contract(address, _abi, signerOrProvider) as Pool;
  }
}
