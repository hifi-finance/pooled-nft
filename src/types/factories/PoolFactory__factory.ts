/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PoolFactory, PoolFactoryInterface } from "../PoolFactory";

const _abi = [
  {
    inputs: [],
    name: "PoolFactory__DoesNotImplementIERC721Metadata",
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
        name: "pool",
        type: "address",
      },
    ],
    name: "CreatePool",
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
    name: "createPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611dcc806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80639049f9d214610030575b600080fd5b61004361003e36600461027f565b610045565b005b6040516301ffc9a760e01b8152635b5e139f60e01b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa158015610090573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100b491906102af565b6100d15760405163c5252bb360e01b815260040160405180910390fd5b6000816001600160a01b03166306fdde036040518163ffffffff1660e01b8152600401600060405180830381865afa158015610111573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101399190810190610317565b60405160200161014991906103c4565b60405160208183030381529060405290506000826001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa15801561019a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101c29190810190610317565b6040516020016101d29190610405565b604051602081830303815290604052905060008282856040516101f490610272565b61020093929190610456565b604051809103906000f08015801561021c573d6000803e3d6000fd5b509050806001600160a01b0316846001600160a01b03167f40f18627ffa593d3a62b03127f0b4504c81d0a287270ccbc6ff96a38dc7f065c8585604051610264929190610495565b60405180910390a350505050565b6118fc806104c483390190565b60006020828403121561029157600080fd5b81356001600160a01b03811681146102a857600080fd5b9392505050565b6000602082840312156102c157600080fd5b815180151581146102a857600080fd5b634e487b7160e01b600052604160045260246000fd5b60005b838110156103025781810151838201526020016102ea565b83811115610311576000848401525b50505050565b60006020828403121561032957600080fd5b815167ffffffffffffffff8082111561034157600080fd5b818401915084601f83011261035557600080fd5b815181811115610367576103676102d1565b604051601f8201601f19908116603f0116810190838211818310171561038f5761038f6102d1565b816040528281528760208487010111156103a857600080fd5b6103b98360208301602088016102e7565b979650505050505050565b600082516103d68184602087016102e7565b7f20506f6f6c656400000000000000000000000000000000000000000000000000920191825250600701919050565b600082516104178184602087016102e7565b600760fc1b920191825250600101919050565b600081518084526104428160208601602086016102e7565b601f01601f19169290920160200192915050565b606081526000610469606083018661042a565b828103602084015261047b818661042a565b9150506001600160a01b0383166040830152949350505050565b6040815260006104a8604083018561042a565b82810360208401526104ba818561042a565b9594505050505056fe60a06040523480156200001157600080fd5b50604051620018fc380380620018fc8339810160408190526200003491620001ee565b8251839083906200004d9060039060208501906200007b565b508051620000639060049060208401906200007b565b5050506001600160a01b031660805250620002b79050565b82805462000089906200027b565b90600052602060002090601f016020900481019282620000ad5760008555620000f8565b82601f10620000c857805160ff1916838001178555620000f8565b82800160010185558215620000f8579182015b82811115620000f8578251825591602001919060010190620000db565b50620001069291506200010a565b5090565b5b808211156200010657600081556001016200010b565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200014957600080fd5b81516001600160401b038082111562000166576200016662000121565b604051601f8301601f19908116603f0116810190828211818310171562000191576200019162000121565b81604052838152602092508683858801011115620001ae57600080fd5b600091505b83821015620001d25785820183015181830184015290820190620001b3565b83821115620001e45760008385830101525b9695505050505050565b6000806000606084860312156200020457600080fd5b83516001600160401b03808211156200021c57600080fd5b6200022a8783880162000137565b945060208601519150808211156200024157600080fd5b50620002508682870162000137565b604086015190935090506001600160a01b03811681146200027057600080fd5b809150509250925092565b600181811c908216806200029057607f821691505b602082108103620002b157634e487b7160e01b600052602260045260246000fd5b50919050565b60805161160d620002ef600039600081816101af0152818161045201528181610652015281816107140152610982015261160d6000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806370a08231116100b2578063a9059cbb11610081578063c4c9741b11610066578063c4c9741b14610279578063dd62ed3e1461028c578063e037a2c7146102c557600080fd5b8063a9059cbb14610253578063afee80d91461026657600080fd5b806370a08231146101fc57806395d89b4114610225578063a3ff19a41461022d578063a457c2d71461024057600080fd5b806323b872dd116100ee57806323b872dd14610188578063313ce5671461019b57806338d52e0f146101aa57806339509351146101e957600080fd5b806306fdde0314610120578063095ea7b31461013e57806318160ddd1461016157806322f5ac0214610173575b600080fd5b6101286102cd565b60405161013591906111b3565b60405180910390f35b61015161014c366004611224565b61035f565b6040519015158152602001610135565b6002545b604051908152602001610135565b61018661018136600461129a565b610379565b005b6101516101963660046112f7565b610518565b60405160128152602001610135565b6101d17f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610135565b6101516101f7366004611224565b61053c565b61016561020a366004611333565b6001600160a01b031660009081526020819052604090205490565b61012861057b565b61018661023b36600461134e565b61058a565b61015161024e366004611224565b6107cc565b610151610261366004611224565b61087b565b6101656102743660046113cf565b610889565b6101866102873660046113e8565b610896565b61016561029a36600461143b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b610165610a28565b6060600380546102dc9061146e565b80601f01602080910402602001604051908101604052809291908181526020018280546103089061146e565b80156103555780601f1061032a57610100808354040283529160200191610355565b820191906000526020600020905b81548152906001019060200180831161033857829003601f168201915b5050505050905090565b60003361036d818585610a39565b60019150505b92915050565b600083900361039b5760405163a5dead6960e01b815260040160405180910390fd5b816103ae84670de0b6b3a76400006114be565b146103cc5760405163612251c760e11b815260040160405180910390fd5b6001600160a01b0381166103f35760405163ab0f9cf760e01b815260040160405180910390fd5b60005b838110156104c2576000858583818110610412576104126114dd565b90506020020135905061042f816005610b5e90919063ffffffff16565b506040516323b872dd60e01b8152336004820152306024820152604481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906323b872dd90606401600060405180830381600087803b15801561049e57600080fd5b505af11580156104b2573d6000803e3d6000fd5b50505050816001019150506103f6565b506104cd8183610b71565b806001600160a01b03167f2b4219bb15d2e4804fa97f7e2a708d59ff50ece96eb684a05f3b12cb6c40a2d085858560405161050a93929190611542565b60405180910390a250505050565b600033610526858285610c50565b610531858585610ce2565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061036d9082908690610576908790611566565b610a39565b6060600480546102dc9061146e565b60008490036105ac5760405163a5dead6960e01b815260040160405180910390fd5b8382146105cc5760405163612251c760e11b815260040160405180910390fd5b6001600160a01b0381166105f35760405163ab0f9cf760e01b815260040160405180910390fd5b60005b8481101561077d576000868683818110610612576106126114dd565b90506020020135905061062f816005610b5e90919063ffffffff16565b506040516323b872dd60e01b8152336004820152306024820152604481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906323b872dd90606401600060405180830381600087803b15801561069e57600080fd5b505af11580156106b2573d6000803e3d6000fd5b5050505060008585848181106106ca576106ca6114dd565b9050602002013590506106e7816005610edf90919063ffffffff16565b506040516323b872dd60e01b81523060048201526001600160a01b038581166024830152604482018390527f000000000000000000000000000000000000000000000000000000000000000016906323b872dd90606401600060405180830381600087803b15801561075857600080fd5b505af115801561076c573d6000803e3d6000fd5b5050505082600101925050506105f6565b50806001600160a01b03167f0482325a8e0d87a795f1b932f4864348776133a209264b40b05b9a428dcd799b868686866040516107bd949392919061157e565b60405180910390a25050505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091908381101561086e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6105318286868403610a39565b60003361036d818585610ce2565b6000610373600583610eeb565b836000036108b75760405163a5dead6960e01b815260040160405180910390fd5b6108c982670de0b6b3a76400006114be565b84146108e85760405163612251c760e11b815260040160405180910390fd5b6001600160a01b03811661090f5760405163ab0f9cf760e01b815260040160405180910390fd5b6109193385610ef7565b60005b828110156109ea576000848483818110610938576109386114dd565b905060200201359050610955816005610edf90919063ffffffff16565b506040516323b872dd60e01b81523060048201526001600160a01b038481166024830152604482018390527f000000000000000000000000000000000000000000000000000000000000000016906323b872dd90606401600060405180830381600087803b1580156109c657600080fd5b505af11580156109da573d6000803e3d6000fd5b505050508160010191505061091c565b50806001600160a01b03167f4a9f43dc50f4433ceaad8dd954b2eb7ab081462d4e95eedfc853d76840d7664285858560405161050a939291906115b0565b6000610a34600561103d565b905090565b6001600160a01b038316610a9b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610865565b6001600160a01b038216610afc5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610865565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6000610b6a8383611047565b9392505050565b6001600160a01b038216610bc75760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610865565b8060026000828254610bd99190611566565b90915550506001600160a01b03821660009081526020819052604081208054839290610c06908490611566565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610cdc5781811015610ccf5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610865565b610cdc8484848403610a39565b50505050565b6001600160a01b038316610d5e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610865565b6001600160a01b038216610dc05760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610865565b6001600160a01b03831660009081526020819052604090205481811015610e4f5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610865565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610e86908490611566565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610ed291815260200190565b60405180910390a3610cdc565b6000610b6a8383611096565b6000610b6a8383611189565b6001600160a01b038216610f575760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610865565b6001600160a01b03821660009081526020819052604090205481811015610fcb5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610865565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610ffa9084906115d3565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610b51565b6000610373825490565b600081815260018301602052604081205461108e57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610373565b506000610373565b6000818152600183016020526040812054801561117f5760006110ba6001836115d3565b85549091506000906110ce906001906115d3565b90508181146111335760008660000182815481106110ee576110ee6114dd565b9060005260206000200154905080876000018481548110611111576111116114dd565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611144576111446115ea565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610373565b6000915050610373565b60008260000182815481106111a0576111a06114dd565b9060005260206000200154905092915050565b600060208083528351808285015260005b818110156111e0578581018301518582016040015282016111c4565b818111156111f2576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461121f57600080fd5b919050565b6000806040838503121561123757600080fd5b61124083611208565b946020939093013593505050565b60008083601f84011261126057600080fd5b50813567ffffffffffffffff81111561127857600080fd5b6020830191508360208260051b850101111561129357600080fd5b9250929050565b600080600080606085870312156112b057600080fd5b843567ffffffffffffffff8111156112c757600080fd5b6112d38782880161124e565b909550935050602085013591506112ec60408601611208565b905092959194509250565b60008060006060848603121561130c57600080fd5b61131584611208565b925061132360208501611208565b9150604084013590509250925092565b60006020828403121561134557600080fd5b610b6a82611208565b60008060008060006060868803121561136657600080fd5b853567ffffffffffffffff8082111561137e57600080fd5b61138a89838a0161124e565b909750955060208801359150808211156113a357600080fd5b506113b08882890161124e565b90945092506113c3905060408701611208565b90509295509295909350565b6000602082840312156113e157600080fd5b5035919050565b600080600080606085870312156113fe57600080fd5b84359350602085013567ffffffffffffffff81111561141c57600080fd5b6114288782880161124e565b90945092506112ec905060408601611208565b6000806040838503121561144e57600080fd5b61145783611208565b915061146560208401611208565b90509250929050565b600181811c9082168061148257607f821691505b6020821081036114a257634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156114d8576114d86114a8565b500290565b634e487b7160e01b600052603260045260246000fd5b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561152557600080fd5b8260051b8083602087013760009401602001938452509192915050565b6040815260006115566040830185876114f3565b9050826020830152949350505050565b60008219821115611579576115796114a8565b500190565b6040815260006115926040830186886114f3565b82810360208401526115a58185876114f3565b979650505050505050565b8381526040602082015260006115ca6040830184866114f3565b95945050505050565b6000828210156115e5576115e56114a8565b500390565b634e487b7160e01b600052603160045260246000fdfea164736f6c634300080d000aa164736f6c634300080d000a";

type PoolFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PoolFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PoolFactory__factory extends ContractFactory {
  constructor(...args: PoolFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "PoolFactory";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PoolFactory> {
    return super.deploy(overrides || {}) as Promise<PoolFactory>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PoolFactory {
    return super.attach(address) as PoolFactory;
  }
  connect(signer: Signer): PoolFactory__factory {
    return super.connect(signer) as PoolFactory__factory;
  }
  static readonly contractName: "PoolFactory";
  public readonly contractName: "PoolFactory";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PoolFactoryInterface {
    return new utils.Interface(_abi) as PoolFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PoolFactory {
    return new Contract(address, _abi, signerOrProvider) as PoolFactory;
  }
}
