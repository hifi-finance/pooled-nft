/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC721Pool, ERC721PoolInterface } from "../ERC721Pool";

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
    name: "ERC721Pool__InOutMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721Pool__InsufficientIn",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721Pool__InvalidTo",
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
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "redeemWithSignature",
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
  {
    inputs: [],
    name: "version",
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
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50336080526080516119fc61003760003960008181610353015261046701526119fc6000f3fe608060405234801561001057600080fd5b506004361061018d5760003560e01c806354fd4d50116100e3578063afee80d91161008c578063d505accf11610066578063d505accf14610388578063dd62ed3e1461039b578063e037a2c7146103c657600080fd5b8063afee80d91461033b578063c45a01551461034e578063c4c9741b1461037557600080fd5b806395d89b41116100bd57806395d89b411461030d578063a3ff19a414610315578063a9059cbb1461032857600080fd5b806354fd4d50146102ad57806370a08231146102cd5780637ecebe00146102ed57600080fd5b806322f5ac0211610145578063313ce5671161011f578063313ce5671461025f5780633644e5151461027957806338d52e0f1461028257600080fd5b806322f5ac021461021257806323b872dd1461022557806330adf81f1461023857600080fd5b8063095ea7b311610176578063095ea7b3146101c557806316cb7821146101e857806318160ddd146101fb57600080fd5b806306fdde0314610192578063077f224a146101b0575b600080fd5b61019a6103ce565b6040516101a79190611245565b60405180910390f35b6101c36101be366004611362565b61045c565b005b6101d86101d33660046113d6565b6105fe565b60405190151581526020016101a7565b6101c36101f636600461144c565b610615565b61020460005481565b6040519081526020016101a7565b6101c36102203660046114ef565b610634565b6101d861023336600461154c565b6107a9565b6102047f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b610267601281565b60405160ff90911681526020016101a7565b61020460055481565b600754610295906001600160a01b031681565b6040516001600160a01b0390911681526020016101a7565b61019a604051806040016040528060018152602001603160f81b81525081565b6102046102db366004611588565b60016020526000908152604090205481565b6102046102fb366004611588565b60066020526000908152604090205481565b61019a61083e565b6101c36103233660046115a3565b61084b565b6101d86103363660046113d6565b610a55565b610204610349366004611624565b610a62565b6102957f000000000000000000000000000000000000000000000000000000000000000081565b6101c361038336600461163d565b610a6f565b6101c3610396366004611690565b610be5565b6102046103a9366004611703565b600260209081526000928352604080842090915290825290205481565b610204610da6565b600380546103db90611736565b80601f016020809104026020016040519081016040528092919081815260200182805461040790611736565b80156104545780601f1061042957610100808354040283529160200191610454565b820191906000526020600020905b81548152906001019060200180831161043757829003601f168201915b505050505081565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146104a557604051632dc9a2c560e11b815260040160405180910390fd5b82516104b89060039060208601906111ac565b5081516104cc9060049060208501906111ac565b50600780547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03831617905560405146907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f9061053390600390611770565b60408051918290038220828201825260018352603160f81b6020938401528151928301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66060820152608081018290523060a082015260c00160408051601f198184030181529082905280516020909101206005556007546001600160a01b0316907f1ad5258fd94fd6ce147b9bf86c9fa73f75ad24a4838ae307465cb85e4f88a892906105f090600390600490611859565b60405180910390a250505050565b600061060b338484610db7565b5060015b92915050565b610620868383610e19565b61062c86868686610a6f565b505050505050565b60008390036106565760405163251e5fcb60e11b815260040160405180910390fd5b8161066984670de0b6b3a764000061189d565b14610687576040516336e7148f60e01b815260040160405180910390fd5b6001600160a01b0381166106ae57604051631cb5ce3760e31b815260040160405180910390fd5b60005b838110156107615760008585838181106106cd576106cd6118bc565b9050602002013590506106ea816008610e4690919063ffffffff16565b506007546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd90606401600060405180830381600087803b15801561073d57600080fd5b505af1158015610751573d6000803e3d6000fd5b50505050816001019150506106b1565b5061076c8183610e59565b806001600160a01b03167f2b4219bb15d2e4804fa97f7e2a708d59ff50ece96eb684a05f3b12cb6c40a2d08585856040516105f093929190611921565b6001600160a01b038316600090815260026020908152604080832033845290915281205460001914610829576001600160a01b0384166000908152600260209081526040808320338452909152902054610804908390611945565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b610834848484610eea565b5060019392505050565b600480546103db90611736565b600084900361086d5760405163251e5fcb60e11b815260040160405180910390fd5b83821461088d576040516336e7148f60e01b815260040160405180910390fd5b6001600160a01b0381166108b457604051631cb5ce3760e31b815260040160405180910390fd5b60005b84811015610a065760008686838181106108d3576108d36118bc565b9050602002013590506108f0816008610e4690919063ffffffff16565b506007546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd90606401600060405180830381600087803b15801561094357600080fd5b505af1158015610957573d6000803e3d6000fd5b50505050600085858481811061096f5761096f6118bc565b90506020020135905061098c816008610f9290919063ffffffff16565b506007546040516323b872dd60e01b81523060048201526001600160a01b03868116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b1580156109e157600080fd5b505af11580156109f5573d6000803e3d6000fd5b5050505082600101925050506108b7565b50806001600160a01b03167f0482325a8e0d87a795f1b932f4864348776133a209264b40b05b9a428dcd799b86868686604051610a46949392919061195c565b60405180910390a25050505050565b600061060b338484610eea565b600061060f600883610f9e565b83600003610a905760405163251e5fcb60e11b815260040160405180910390fd5b610aa282670de0b6b3a764000061189d565b8414610ac1576040516336e7148f60e01b815260040160405180910390fd5b6001600160a01b038116610ae857604051631cb5ce3760e31b815260040160405180910390fd5b610af23385610faa565b60005b82811015610ba7576000848483818110610b1157610b116118bc565b905060200201359050610b2e816008610f9290919063ffffffff16565b506007546040516323b872dd60e01b81523060048201526001600160a01b03858116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b158015610b8357600080fd5b505af1158015610b97573d6000803e3d6000fd5b5050505081600101915050610af5565b50806001600160a01b03167f4a9f43dc50f4433ceaad8dd954b2eb7ab081462d4e95eedfc853d76840d766428585856040516105f09392919061198e565b42841015610c0657604051639436330960e01b815260040160405180910390fd5b6005546001600160a01b038816600090815260066020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b919087610c59836119a8565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e00160405160208183030381529060405280519060200120604051602001610cd292919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015610d3d573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381161580610d725750886001600160a01b0316816001600160a01b031614155b15610d905760405163068d22f760e11b815260040160405180910390fd5b610d9b898989610db7565b505050505050505050565b6000610db26008611036565b905090565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b805115610e415760208101516040820151606083015160001a61062c33308888858888610be5565b505050565b6000610e528383611040565b9392505050565b80600054610e6791906119c1565b60009081556001600160a01b038316815260016020526040902054610e8d9082906119c1565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610ede9085815260200190565b60405180910390a35050565b6001600160a01b038316600090815260016020526040902054610f0e908290611945565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610f3e9082906119c1565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610e0c9085815260200190565b6000610e52838361108f565b6000610e528383611182565b6001600160a01b038216600090815260016020526040902054610fce908290611945565b6001600160a01b03831660009081526001602052604081209190915554610ff6908290611945565b60009081556040518281526001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610ede565b600061060f825490565b60008181526001830160205260408120546110875750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561060f565b50600061060f565b600081815260018301602052604081205480156111785760006110b3600183611945565b85549091506000906110c790600190611945565b905081811461112c5760008660000182815481106110e7576110e76118bc565b906000526020600020015490508087600001848154811061110a5761110a6118bc565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061113d5761113d6119d9565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061060f565b600091505061060f565b6000826000018281548110611199576111996118bc565b9060005260206000200154905092915050565b8280546111b890611736565b90600052602060002090601f0160209004810192826111da5760008555611220565b82601f106111f357805160ff1916838001178555611220565b82800160010185558215611220579182015b82811115611220578251825591602001919060010190611205565b5061122c929150611230565b5090565b5b8082111561122c5760008155600101611231565b600060208083528351808285015260005b8181101561127257858101830151858201604001528201611256565b81811115611284576000604083870101525b50601f01601f1916929092016040019392505050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156112cb576112cb61129a565b604051601f8501601f19908116603f011681019082821181831017156112f3576112f361129a565b8160405280935085815286868601111561130c57600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011261133757600080fd5b610e52838335602085016112b0565b80356001600160a01b038116811461135d57600080fd5b919050565b60008060006060848603121561137757600080fd5b833567ffffffffffffffff8082111561138f57600080fd5b61139b87838801611326565b945060208601359150808211156113b157600080fd5b506113be86828701611326565b9250506113cd60408501611346565b90509250925092565b600080604083850312156113e957600080fd5b6113f283611346565b946020939093013593505050565b60008083601f84011261141257600080fd5b50813567ffffffffffffffff81111561142a57600080fd5b6020830191508360208260051b850101111561144557600080fd5b9250929050565b60008060008060008060a0878903121561146557600080fd5b86359550602087013567ffffffffffffffff8082111561148457600080fd5b6114908a838b01611400565b90975095508591506114a460408a01611346565b94506060890135935060808901359150808211156114c157600080fd5b508701601f810189136114d357600080fd5b6114e2898235602084016112b0565b9150509295509295509295565b6000806000806060858703121561150557600080fd5b843567ffffffffffffffff81111561151c57600080fd5b61152887828801611400565b9095509350506020850135915061154160408601611346565b905092959194509250565b60008060006060848603121561156157600080fd5b61156a84611346565b925061157860208501611346565b9150604084013590509250925092565b60006020828403121561159a57600080fd5b610e5282611346565b6000806000806000606086880312156115bb57600080fd5b853567ffffffffffffffff808211156115d357600080fd5b6115df89838a01611400565b909750955060208801359150808211156115f857600080fd5b5061160588828901611400565b9094509250611618905060408701611346565b90509295509295909350565b60006020828403121561163657600080fd5b5035919050565b6000806000806060858703121561165357600080fd5b84359350602085013567ffffffffffffffff81111561167157600080fd5b61167d87828801611400565b9094509250611541905060408601611346565b600080600080600080600060e0888a0312156116ab57600080fd5b6116b488611346565b96506116c260208901611346565b95506040880135945060608801359350608088013560ff811681146116e657600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561171657600080fd5b61171f83611346565b915061172d60208401611346565b90509250929050565b600181811c9082168061174a57607f821691505b60208210810361176a57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835461177e81611736565b6001828116801561179657600181146117a7576117d6565b60ff198416875282870194506117d6565b8760005260208060002060005b858110156117cd5781548a8201529084019082016117b4565b50505082870194505b50929695505050505050565b600081546117ef81611736565b80855260206001838116801561180c57600181146118205761184e565b60ff1985168884015260408801955061184e565b866000528260002060005b858110156118465781548a820186015290830190840161182b565b890184019650505b505050505092915050565b60408152600061186c60408301856117e2565b828103602084015261187e81856117e2565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156118b7576118b7611887565b500290565b634e487b7160e01b600052603260045260246000fd5b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561190457600080fd5b8260051b8083602087013760009401602001938452509192915050565b6040815260006119356040830185876118d2565b9050826020830152949350505050565b60008282101561195757611957611887565b500390565b6040815260006119706040830186886118d2565b82810360208401526119838185876118d2565b979650505050505050565b83815260406020820152600061187e6040830184866118d2565b6000600182016119ba576119ba611887565b5060010190565b600082198211156119d4576119d4611887565b500190565b634e487b7160e01b600052603160045260246000fdfea164736f6c634300080d000a";

type ERC721PoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721PoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Pool__factory extends ContractFactory {
  constructor(...args: ERC721PoolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC721Pool";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721Pool> {
    return super.deploy(overrides || {}) as Promise<ERC721Pool>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC721Pool {
    return super.attach(address) as ERC721Pool;
  }
  connect(signer: Signer): ERC721Pool__factory {
    return super.connect(signer) as ERC721Pool__factory;
  }
  static readonly contractName: "ERC721Pool";
  public readonly contractName: "ERC721Pool";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721PoolInterface {
    return new utils.Interface(_abi) as ERC721PoolInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Pool {
    return new Contract(address, _abi, signerOrProvider) as ERC721Pool;
  }
}
