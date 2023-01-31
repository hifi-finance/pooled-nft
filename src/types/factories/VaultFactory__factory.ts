/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { VaultFactory, VaultFactoryInterface } from "../VaultFactory";

const _abi = [
  {
    inputs: [],
    name: "VaultFactory__DoesNotImplementIERC721Metadata",
    type: "error",
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
      {
        indexed: true,
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    name: "CreateVault",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "createVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611aca806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063b4bd6f4614610030575b600080fd5b61004361003e36600461027f565b610045565b005b6040516301ffc9a760e01b8152635b5e139f60e01b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa158015610090573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100b491906102af565b6100d157604051630a54131960e11b815260040160405180910390fd5b6000816001600160a01b03166306fdde036040518163ffffffff1660e01b8152600401600060405180830381865afa158015610111573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101399190810190610317565b60405160200161014991906103c4565b60405160208183030381529060405290506000826001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa15801561019a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101c29190810190610317565b6040516020016101d29190610405565b604051602081830303815290604052905060008282856040516101f490610272565b61020093929190610456565b604051809103906000f08015801561021c573d6000803e3d6000fd5b509050806001600160a01b0316846001600160a01b03167fb3ba352c31f75f8e7f697e88e34c64e8414626a1bac6a9d68f8035030083acb28585604051610264929190610495565b60405180910390a350505050565b6115fa806104c483390190565b60006020828403121561029157600080fd5b81356001600160a01b03811681146102a857600080fd5b9392505050565b6000602082840312156102c157600080fd5b815180151581146102a857600080fd5b634e487b7160e01b600052604160045260246000fd5b60005b838110156103025781810151838201526020016102ea565b83811115610311576000848401525b50505050565b60006020828403121561032957600080fd5b815167ffffffffffffffff8082111561034157600080fd5b818401915084601f83011261035557600080fd5b815181811115610367576103676102d1565b604051601f8201601f19908116603f0116810190838211818310171561038f5761038f6102d1565b816040528281528760208487010111156103a857600080fd5b6103b98360208301602088016102e7565b979650505050505050565b600082516103d68184602087016102e7565b7f205661756c746564000000000000000000000000000000000000000000000000920191825250600801919050565b600082516104178184602087016102e7565b603b60f91b920191825250600101919050565b600081518084526104428160208601602086016102e7565b601f01601f19169290920160200192915050565b606081526000610469606083018661042a565b828103602084015261047b818661042a565b9150506001600160a01b0383166040830152949350505050565b6040815260006104a8604083018561042a565b82810360208401526104ba818561042a565b9594505050505056fe60a06040523480156200001157600080fd5b50604051620015fa380380620015fa8339810160408190526200003491620001ee565b8251839083906200004d9060039060208501906200007b565b508051620000639060049060208401906200007b565b5050506001600160a01b031660805250620002b79050565b82805462000089906200027b565b90600052602060002090601f016020900481019282620000ad5760008555620000f8565b82601f10620000c857805160ff1916838001178555620000f8565b82800160010185558215620000f8579182015b82811115620000f8578251825591602001919060010190620000db565b50620001069291506200010a565b5090565b5b808211156200010657600081556001016200010b565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200014957600080fd5b81516001600160401b038082111562000166576200016662000121565b604051601f8301601f19908116603f0116810190828211818310171562000191576200019162000121565b81604052838152602092508683858801011115620001ae57600080fd5b600091505b83821015620001d25785820183015181830184015290820190620001b3565b83821115620001e45760008385830101525b9695505050505050565b6000806000606084860312156200020457600080fd5b83516001600160401b03808211156200021c57600080fd5b6200022a8783880162000137565b945060208601519150808211156200024157600080fd5b50620002508682870162000137565b604086015190935090506001600160a01b03811681146200027057600080fd5b809150509250925092565b600181811c908216806200029057607f821691505b602082108103620002b157634e487b7160e01b600052602260045260246000fd5b50919050565b608051611319620002e160003960008181610196015281816105b6015261077201526113196000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80636337cd1511610097578063a9059cbb11610066578063a9059cbb1461023a578063c24317ff1461024d578063dd62ed3e14610262578063fa7516061461029b57600080fd5b80636337cd15146101e357806370a08231146101f657806395d89b411461021f578063a457c2d71461022757600080fd5b806323b872dd116100d357806323b872dd1461016f578063313ce5671461018257806338d52e0f1461019157806339509351146101d057600080fd5b806306fdde0314610105578063095ea7b314610123578063106002001461014657806318160ddd14610167575b600080fd5b61010d6102ae565b60405161011a9190610f8b565b60405180910390f35b610136610131366004610ffc565b610340565b604051901515815260200161011a565b610159610154366004611026565b61035a565b60405190815260200161011a565b600254610159565b61013661017d366004611041565b61037b565b6040516012815260200161011a565b6101b87f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161011a565b6101366101de366004610ffc565b61039f565b6101596101f1366004610ffc565b6103de565b610159610204366004611026565b6001600160a01b031660009081526020819052604090205490565b61010d610407565b610136610235366004610ffc565b610416565b610136610248366004610ffc565b6104c5565b61026061025b3660046110c9565b6104d3565b005b610159610270366004611126565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6102606102a9366004611159565b61067c565b6060600380546102bd906111ac565b80601f01602080910402602001604051908101604052809291908181526020018280546102e9906111ac565b80156103365780601f1061030b57610100808354040283529160200191610336565b820191906000526020600020905b81548152906001019060200180831161031957829003601f168201915b5050505050905090565b60003361034e818585610818565b60019150505b92915050565b6001600160a01b03811660009081526005602052604081206103549061093d565b600033610389858285610947565b6103948585856109d9565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061034e90829086906103d99087906111fc565b610818565b6001600160a01b03821660009081526005602052604081206104009083610bd6565b9392505050565b6060600480546102bd906111ac565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156104b85760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6103948286868403610818565b60003361034e8185856109d9565b60008390036104f557604051631d90bf4160e21b815260040160405180910390fd5b8161050884670de0b6b3a7640000611214565b1461052657604051639853f1fd60e01b815260040160405180910390fd5b6001600160a01b03811661054d5760405163e398b79960e01b815260040160405180910390fd5b60005b8381101561062657600085858381811061056c5761056c611233565b33600090815260056020908152604090912091029290920135925061059391905082610be2565b506040516323b872dd60e01b8152336004820152306024820152604481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906323b872dd90606401600060405180830381600087803b15801561060257600080fd5b505af1158015610616573d6000803e3d6000fd5b5050505081600101915050610550565b506106318183610bee565b806001600160a01b03167f060aab1df3985b4f94dc3f132af47a823aa3c9c6b60f70f226252927644194f385858560405161066e93929190611298565b60405180910390a250505050565b8360000361069d57604051631d90bf4160e21b815260040160405180910390fd5b6106af82670de0b6b3a7640000611214565b84146106ce57604051639853f1fd60e01b815260040160405180910390fd5b6001600160a01b0381166106f55760405163e398b79960e01b815260040160405180910390fd5b6106ff3385610ccd565b60005b828110156107da57600084848381811061071e5761071e611233565b33600090815260056020908152604090912091029290920135925061074591905082610e13565b506040516323b872dd60e01b81523060048201526001600160a01b038481166024830152604482018390527f000000000000000000000000000000000000000000000000000000000000000016906323b872dd90606401600060405180830381600087803b1580156107b657600080fd5b505af11580156107ca573d6000803e3d6000fd5b5050505081600101915050610702565b50806001600160a01b03167f5954357d4870d8a09afb91f15e4c72700c4573b59867dfd60ef62affbe9747b785858560405161066e939291906112bc565b6001600160a01b03831661087a5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104af565b6001600160a01b0382166108db5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104af565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6000610354825490565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146109d357818110156109c65760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104af565b6109d38484848403610818565b50505050565b6001600160a01b038316610a555760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016104af565b6001600160a01b038216610ab75760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104af565b6001600160a01b03831660009081526020819052604090205481811015610b465760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016104af565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610b7d9084906111fc565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bc991815260200190565b60405180910390a36109d3565b60006104008383610e1f565b60006104008383610e49565b6001600160a01b038216610c445760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104af565b8060026000828254610c5691906111fc565b90915550506001600160a01b03821660009081526020819052604081208054839290610c839084906111fc565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610d2d5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016104af565b6001600160a01b03821660009081526020819052604090205481811015610da15760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016104af565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610dd09084906112df565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610930565b60006104008383610e98565b6000826000018281548110610e3657610e36611233565b9060005260206000200154905092915050565b6000818152600183016020526040812054610e9057508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610354565b506000610354565b60008181526001830160205260408120548015610f81576000610ebc6001836112df565b8554909150600090610ed0906001906112df565b9050818114610f35576000866000018281548110610ef057610ef0611233565b9060005260206000200154905080876000018481548110610f1357610f13611233565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610f4657610f466112f6565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610354565b6000915050610354565b600060208083528351808285015260005b81811015610fb857858101830151858201604001528201610f9c565b81811115610fca576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610ff757600080fd5b919050565b6000806040838503121561100f57600080fd5b61101883610fe0565b946020939093013593505050565b60006020828403121561103857600080fd5b61040082610fe0565b60008060006060848603121561105657600080fd5b61105f84610fe0565b925061106d60208501610fe0565b9150604084013590509250925092565b60008083601f84011261108f57600080fd5b50813567ffffffffffffffff8111156110a757600080fd5b6020830191508360208260051b85010111156110c257600080fd5b9250929050565b600080600080606085870312156110df57600080fd5b843567ffffffffffffffff8111156110f657600080fd5b6111028782880161107d565b9095509350506020850135915061111b60408601610fe0565b905092959194509250565b6000806040838503121561113957600080fd5b61114283610fe0565b915061115060208401610fe0565b90509250929050565b6000806000806060858703121561116f57600080fd5b84359350602085013567ffffffffffffffff81111561118d57600080fd5b6111998782880161107d565b909450925061111b905060408601610fe0565b600181811c908216806111c057607f821691505b6020821081036111e057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561120f5761120f6111e6565b500190565b600081600019048311821515161561122e5761122e6111e6565b500290565b634e487b7160e01b600052603260045260246000fd5b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561127b57600080fd5b8260051b8083602087013760009401602001938452509192915050565b6040815260006112ac604083018587611249565b9050826020830152949350505050565b8381526040602082015260006112d6604083018486611249565b95945050505050565b6000828210156112f1576112f16111e6565b500390565b634e487b7160e01b600052603160045260246000fdfea164736f6c634300080d000aa164736f6c634300080d000a";

type VaultFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VaultFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VaultFactory__factory extends ContractFactory {
  constructor(...args: VaultFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "VaultFactory";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VaultFactory> {
    return super.deploy(overrides || {}) as Promise<VaultFactory>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): VaultFactory {
    return super.attach(address) as VaultFactory;
  }
  connect(signer: Signer): VaultFactory__factory {
    return super.connect(signer) as VaultFactory__factory;
  }
  static readonly contractName: "VaultFactory";
  public readonly contractName: "VaultFactory";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VaultFactoryInterface {
    return new utils.Interface(_abi) as VaultFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VaultFactory {
    return new Contract(address, _abi, signerOrProvider) as VaultFactory;
  }
}
