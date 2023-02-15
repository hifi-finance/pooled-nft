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
  "0x60a060405234801561001057600080fd5b503360805260805161164361003760003960008181610348015261044901526116436000f3fe608060405234801561001057600080fd5b50600436106101825760003560e01c80635c5b69a9116100d8578063afee80d91161008c578063d505accf11610066578063d505accf1461036a578063dd62ed3e1461037d578063e037a2c7146103a857600080fd5b8063afee80d91461031d578063b122d2e714610330578063c45a01551461034357600080fd5b80637ecebe00116100bd5780637ecebe00146102e257806395d89b4114610302578063a9059cbb1461030a57600080fd5b80635c5b69a9146102af57806370a08231146102c257600080fd5b806330adf81f1161013a57806338d52e0f1161011457806338d52e0f14610251578063492e47d21461027c57806354fd4d501461028f57600080fd5b806330adf81f14610207578063313ce5671461022e5780633644e5151461024857600080fd5b8063095ea7b31161016b578063095ea7b3146101ba57806318160ddd146101dd57806323b872dd146101f457600080fd5b806306fdde0314610187578063077f224a146101a5575b600080fd5b61018f6103b0565b60405161019c9190610fe4565b60405180910390f35b6101b86101b3366004611101565b61043e565b005b6101cd6101c8366004611175565b6105e0565b604051901515815260200161019c565b6101e660005481565b60405190815260200161019c565b6101cd61020236600461119f565b6105f7565b6101e67f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b610236601281565b60405160ff909116815260200161019c565b6101e660055481565b600754610264906001600160a01b031681565b6040516001600160a01b03909116815260200161019c565b6101b861028a366004611227565b61068c565b61018f604051806040016040528060018152602001603160f81b81525081565b6101b86102bd366004611227565b6107d4565b6101e66102d0366004611272565b60016020526000908152604090205481565b6101e66102f0366004611272565b60066020526000908152604090205481565b61018f61092f565b6101cd610318366004611175565b61093c565b6101e661032b36600461128d565b610949565b6101b861033e3660046112a6565b610956565b6102647f000000000000000000000000000000000000000000000000000000000000000081565b6101b8610378366004611341565b610984565b6101e661038b3660046113b4565b600260209081526000928352604080842090915290825290205481565b6101e6610b45565b600380546103bd906113e7565b80601f01602080910402602001604051908101604052809291908181526020018280546103e9906113e7565b80156104365780601f1061040b57610100808354040283529160200191610436565b820191906000526020600020905b81548152906001019060200180831161041957829003601f168201915b505050505081565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461048757604051632dc9a2c560e11b815260040160405180910390fd5b825161049a906003906020860190610f4b565b5081516104ae906004906020850190610f4b565b50600780547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03831617905560405146907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f9061051590600390611421565b60408051918290038220828201825260018352603160f81b6020938401528151928301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66060820152608081018290523060a082015260c00160408051601f198184030181529082905280516020909101206005556007546001600160a01b0316907f1ad5258fd94fd6ce147b9bf86c9fa73f75ad24a4838ae307465cb85e4f88a892906105d29060039060049061150a565b60405180910390a250505050565b60006105ed338484610b56565b5060015b92915050565b6001600160a01b038316600090815260026020908152604080832033845290915281205460001914610677576001600160a01b038416600090815260026020908152604080832033845290915290205461065290839061154e565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b610682848484610bb8565b5060019392505050565b6001600160a01b0381166106b357604051631cb5ce3760e31b815260040160405180910390fd5b6106ce336106c984670de0b6b3a7640000611565565b610c60565b60005b8281101561078b5760008484838181106106ed576106ed611584565b90506020020135905061070a816008610cf490919063ffffffff16565b61071357600080fd5b6007546040516323b872dd60e01b81523060048201526001600160a01b03858116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b15801561076757600080fd5b505af115801561077b573d6000803e3d6000fd5b50505050816001019150506106d1565b50806001600160a01b03167f37b61d4ad848b88e12400720902b770c20d100ba950eabbfa4f37ee7b47302ca84846040516107c792919061159a565b60405180910390a2505050565b60008290036107f65760405163251e5fcb60e11b815260040160405180910390fd5b6001600160a01b03811661081d57604051631cb5ce3760e31b815260040160405180910390fd5b60005b828110156108d857600084848381811061083c5761083c611584565b905060200201359050610859816008610d0790919063ffffffff16565b61086257600080fd5b6007546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd90606401600060405180830381600087803b1580156108b457600080fd5b505af11580156108c8573d6000803e3d6000fd5b5050505081600101915050610820565b506108f4816108ef84670de0b6b3a7640000611565565b610d13565b806001600160a01b03167ffe3e53059d987c63ffe4d5a45d9130265a9417099abcedf2b2a264a9c750823e84846040516107c792919061159a565b600480546103bd906113e7565b60006105ed338484610bb8565b60006105f1600883610d98565b61097261096b85670de0b6b3a7640000611565565b8383610da4565b61097d85858561068c565b5050505050565b428410156109a557604051639436330960e01b815260040160405180910390fd5b6005546001600160a01b038816600090815260066020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b9190876109f8836115ef565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e00160405160208183030381529060405280519060200120604051602001610a7192919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015610adc573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381161580610b115750886001600160a01b0316816001600160a01b031614155b15610b2f5760405163068d22f760e11b815260040160405180910390fd5b610b3a898989610b56565b505050505050505050565b6000610b516008610dd5565b905090565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316600090815260016020526040902054610bdc90829061154e565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610c0c908290611608565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610bab9085815260200190565b6001600160a01b038216600090815260016020526040902054610c8490829061154e565b6001600160a01b03831660009081526001602052604081209190915554610cac90829061154e565b60009081556040518281526001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020015b60405180910390a35050565b6000610d008383610ddf565b9392505050565b6000610d008383610ed2565b80600054610d219190611608565b60009081556001600160a01b038316815260016020526040902054610d47908290611608565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610ce89085815260200190565b6000610d008383610f21565b805115610dd05760208101516040820151606083015160001a610dcc33308888858888610984565b5050505b505050565b60006105f1825490565b60008181526001830160205260408120548015610ec8576000610e0360018361154e565b8554909150600090610e179060019061154e565b9050818114610e7c576000866000018281548110610e3757610e37611584565b9060005260206000200154905080876000018481548110610e5a57610e5a611584565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610e8d57610e8d611620565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506105f1565b60009150506105f1565b6000818152600183016020526040812054610f19575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556105f1565b5060006105f1565b6000826000018281548110610f3857610f38611584565b9060005260206000200154905092915050565b828054610f57906113e7565b90600052602060002090601f016020900481019282610f795760008555610fbf565b82601f10610f9257805160ff1916838001178555610fbf565b82800160010185558215610fbf579182015b82811115610fbf578251825591602001919060010190610fa4565b50610fcb929150610fcf565b5090565b5b80821115610fcb5760008155600101610fd0565b600060208083528351808285015260005b8181101561101157858101830151858201604001528201610ff5565b81811115611023576000604083870101525b50601f01601f1916929092016040019392505050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561106a5761106a611039565b604051601f8501601f19908116603f0116810190828211818310171561109257611092611039565b816040528093508581528686860111156110ab57600080fd5b858560208301376000602087830101525050509392505050565b600082601f8301126110d657600080fd5b610d008383356020850161104f565b80356001600160a01b03811681146110fc57600080fd5b919050565b60008060006060848603121561111657600080fd5b833567ffffffffffffffff8082111561112e57600080fd5b61113a878388016110c5565b9450602086013591508082111561115057600080fd5b5061115d868287016110c5565b92505061116c604085016110e5565b90509250925092565b6000806040838503121561118857600080fd5b611191836110e5565b946020939093013593505050565b6000806000606084860312156111b457600080fd5b6111bd846110e5565b92506111cb602085016110e5565b9150604084013590509250925092565b60008083601f8401126111ed57600080fd5b50813567ffffffffffffffff81111561120557600080fd5b6020830191508360208260051b850101111561122057600080fd5b9250929050565b60008060006040848603121561123c57600080fd5b833567ffffffffffffffff81111561125357600080fd5b61125f868287016111db565b909450925061116c9050602085016110e5565b60006020828403121561128457600080fd5b610d00826110e5565b60006020828403121561129f57600080fd5b5035919050565b6000806000806000608086880312156112be57600080fd5b853567ffffffffffffffff808211156112d657600080fd5b6112e289838a016111db565b90975095508591506112f6602089016110e5565b945060408801359350606088013591508082111561131357600080fd5b508601601f8101881361132557600080fd5b6113348882356020840161104f565b9150509295509295909350565b600080600080600080600060e0888a03121561135c57600080fd5b611365886110e5565b9650611373602089016110e5565b95506040880135945060608801359350608088013560ff8116811461139757600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156113c757600080fd5b6113d0836110e5565b91506113de602084016110e5565b90509250929050565b600181811c908216806113fb57607f821691505b60208210810361141b57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835461142f816113e7565b60018281168015611447576001811461145857611487565b60ff19841687528287019450611487565b8760005260208060002060005b8581101561147e5781548a820152908401908201611465565b50505082870194505b50929695505050505050565b600081546114a0816113e7565b8085526020600183811680156114bd57600181146114d1576114ff565b60ff198516888401526040880195506114ff565b866000528260002060005b858110156114f75781548a82018601529083019084016114dc565b890184019650505b505050505092915050565b60408152600061151d6040830185611493565b828103602084015261152f8185611493565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561156057611560611538565b500390565b600081600019048311821515161561157f5761157f611538565b500290565b634e487b7160e01b600052603260045260246000fd5b6020815281602082015260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8311156115d357600080fd5b8260051b80856040850137600092016040019182525092915050565b60006001820161160157611601611538565b5060010190565b6000821982111561161b5761161b611538565b500190565b634e487b7160e01b600052603160045260246000fdfea164736f6c634300080d000a";

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
