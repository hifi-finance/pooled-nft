/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC20Wnft, ERC20WnftInterface } from "../ERC20Wnft";

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
  "0x60a060405234801561001057600080fd5b5033608052608051610dc061003760003960008181610295015261038e0152610dc06000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806338d52e0f116100b257806395d89b4111610081578063c45a015511610066578063c45a015514610290578063d505accf146102b7578063dd62ed3e146102ca57600080fd5b806395d89b4114610275578063a9059cbb1461027d57600080fd5b806338d52e0f146101ea57806354fd4d501461021557806370a08231146102355780637ecebe001461025557600080fd5b806323b872dd116100ee57806323b872dd1461018d57806330adf81f146101a0578063313ce567146101c75780633644e515146101e157600080fd5b806306fdde0314610120578063077f224a1461013e578063095ea7b31461015357806318160ddd14610176575b600080fd5b6101286102f5565b604051610135919061094e565b60405180910390f35b61015161014c366004610a62565b610383565b005b610166610161366004610ad6565b610525565b6040519015158152602001610135565b61017f60005481565b604051908152602001610135565b61016661019b366004610b00565b61053b565b61017f7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b6101cf601281565b60405160ff9091168152602001610135565b61017f60055481565b6007546101fd906001600160a01b031681565b6040516001600160a01b039091168152602001610135565b610128604051806040016040528060018152602001603160f81b81525081565b61017f610243366004610b3c565b60016020526000908152604090205481565b61017f610263366004610b3c565b60066020526000908152604090205481565b6101286105d0565b61016661028b366004610ad6565b6105dd565b6101fd7f000000000000000000000000000000000000000000000000000000000000000081565b6101516102c5366004610b5e565b6105ea565b61017f6102d8366004610bd1565b600260209081526000928352604080842090915290825290205481565b6003805461030290610c04565b80601f016020809104026020016040519081016040528092919081815260200182805461032e90610c04565b801561037b5780601f106103505761010080835404028352916020019161037b565b820191906000526020600020905b81548152906001019060200180831161035e57829003601f168201915b505050505081565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103cc57604051632dc9a2c560e11b815260040160405180910390fd5b82516103df9060039060208601906108b5565b5081516103f39060049060208501906108b5565b50600780547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03831617905560405146907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f9061045a90600390610c3e565b60408051918290038220828201825260018352603160f81b6020938401528151928301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66060820152608081018290523060a082015260c00160408051601f198184030181529082905280516020909101206005556007546001600160a01b0316907f1ad5258fd94fd6ce147b9bf86c9fa73f75ad24a4838ae307465cb85e4f88a8929061051790600390600490610d27565b60405180910390a250505050565b60006105323384846107ab565b50600192915050565b6001600160a01b0383166000908152600260209081526040808320338452909152812054600019146105bb576001600160a01b0384166000908152600260209081526040808320338452909152902054610596908390610d6b565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b6105c684848461080d565b5060019392505050565b6004805461030290610c04565b600061053233848461080d565b4284101561060b57604051639436330960e01b815260040160405180910390fd5b6005546001600160a01b038816600090815260066020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b91908761065e83610d82565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e001604051602081830303815290604052805190602001206040516020016106d792919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015610742573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811615806107775750886001600160a01b0316816001600160a01b031614155b156107955760405163068d22f760e11b815260040160405180910390fd5b6107a08989896107ab565b505050505050505050565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316600090815260016020526040902054610831908290610d6b565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610861908290610d9b565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906108009085815260200190565b8280546108c190610c04565b90600052602060002090601f0160209004810192826108e35760008555610929565b82601f106108fc57805160ff1916838001178555610929565b82800160010185558215610929579182015b8281111561092957825182559160200191906001019061090e565b50610935929150610939565b5090565b5b80821115610935576000815560010161093a565b600060208083528351808285015260005b8181101561097b5785810183015185820160400152820161095f565b8181111561098d576000604083870101525b50601f01601f1916929092016040019392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126109ca57600080fd5b813567ffffffffffffffff808211156109e5576109e56109a3565b604051601f8301601f19908116603f01168101908282118183101715610a0d57610a0d6109a3565b81604052838152866020858801011115610a2657600080fd5b836020870160208301376000602085830101528094505050505092915050565b80356001600160a01b0381168114610a5d57600080fd5b919050565b600080600060608486031215610a7757600080fd5b833567ffffffffffffffff80821115610a8f57600080fd5b610a9b878388016109b9565b94506020860135915080821115610ab157600080fd5b50610abe868287016109b9565b925050610acd60408501610a46565b90509250925092565b60008060408385031215610ae957600080fd5b610af283610a46565b946020939093013593505050565b600080600060608486031215610b1557600080fd5b610b1e84610a46565b9250610b2c60208501610a46565b9150604084013590509250925092565b600060208284031215610b4e57600080fd5b610b5782610a46565b9392505050565b600080600080600080600060e0888a031215610b7957600080fd5b610b8288610a46565b9650610b9060208901610a46565b95506040880135945060608801359350608088013560ff81168114610bb457600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610be457600080fd5b610bed83610a46565b9150610bfb60208401610a46565b90509250929050565b600181811c90821680610c1857607f821691505b602082108103610c3857634e487b7160e01b600052602260045260246000fd5b50919050565b6000808354610c4c81610c04565b60018281168015610c645760018114610c7557610ca4565b60ff19841687528287019450610ca4565b8760005260208060002060005b85811015610c9b5781548a820152908401908201610c82565b50505082870194505b50929695505050505050565b60008154610cbd81610c04565b808552602060018381168015610cda5760018114610cee57610d1c565b60ff19851688840152604088019550610d1c565b866000528260002060005b85811015610d145781548a8201860152908301908401610cf9565b890184019650505b505050505092915050565b604081526000610d3a6040830185610cb0565b8281036020840152610d4c8185610cb0565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b600082821015610d7d57610d7d610d55565b500390565b600060018201610d9457610d94610d55565b5060010190565b60008219821115610dae57610dae610d55565b50019056fea164736f6c634300080d000a";

type ERC20WnftConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20WnftConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Wnft__factory extends ContractFactory {
  constructor(...args: ERC20WnftConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC20Wnft";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20Wnft> {
    return super.deploy(overrides || {}) as Promise<ERC20Wnft>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC20Wnft {
    return super.attach(address) as ERC20Wnft;
  }
  connect(signer: Signer): ERC20Wnft__factory {
    return super.connect(signer) as ERC20Wnft__factory;
  }
  static readonly contractName: "ERC20Wnft";
  public readonly contractName: "ERC20Wnft";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20WnftInterface {
    return new utils.Interface(_abi) as ERC20WnftInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20Wnft {
    return new Contract(address, _abi, signerOrProvider) as ERC20Wnft;
  }
}
