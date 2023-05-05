/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721PoolFactory,
  ERC721PoolFactoryInterface,
} from "../ERC721PoolFactory";

const _abi = [
  {
    inputs: [],
    name: "ERC721PoolFactory__DoesNotImplementIERC721Metadata",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721PoolFactory__PoolAlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721PoolFactory__PoolDoesNotExist",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721PoolFactory__RecipientZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC721PoolFactory__RegistrarZeroAddress",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "RescueLastNFT",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allPools",
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
    inputs: [],
    name: "allPoolsLength",
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
        name: "asset",
        type: "address",
      },
    ],
    name: "createPool",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "getPool",
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
    inputs: [],
    name: "nonce",
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
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "rescueLastNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "registrar",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setENSName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600060035534801561001557600080fd5b5061001f33610024565b610074565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b612734806100836000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80639049f9d211610076578063bbe4f6db1161005b578063bbe4f6db1461015e578063efde4e6414610187578063f2fde38b1461018f57600080fd5b80639049f9d214610134578063affed0e01461014757600080fd5b8063715018a6116100a7578063715018a61461010857806385309f8b146101105780638da5cb5b1461012357600080fd5b806317d08140146100c357806341d1de97146100d8575b600080fd5b6100d66100d1366004610983565b6101a2565b005b6100eb6100e6366004610a24565b610296565b6040516001600160a01b0390911681526020015b60405180910390f35b6100d66102c0565b6100d661011e366004610a3d565b6102d4565b6000546001600160a01b03166100eb565b6100d6610142366004610a70565b610422565b61015060035481565b6040519081526020016100ff565b6100eb61016c366004610a70565b6001602052600090815260409020546001600160a01b031681565b600254610150565b6100d661019d366004610a70565b61079f565b6101aa610834565b6001600160a01b03838116600090815260016020526040902054166101e25760405163fd3cb6e560e01b815260040160405180910390fd5b6001600160a01b038216610209576040516341f561ed60e01b815260040160405180910390fd5b6001600160a01b0380841660009081526001602052604090819020549051631b88545960e01b81529116908190631b8854599061024c9086908690600401610aee565b6020604051808303816000875af115801561026b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061028f9190610b18565b5050505050565b600281815481106102a657600080fd5b6000918252602090912001546001600160a01b0316905081565b6102c8610834565b6102d2600061088e565b565b6102dc610834565b6001600160a01b03828116600090815260016020526040902054166103145760405163fd3cb6e560e01b815260040160405180910390fd5b6001600160a01b03811661033b5760405163764ce46560e01b815260040160405180910390fd5b6001600160a01b038281166000908152600160205260409081902054905163b416297160e01b81528383166004820152911690819063b416297190602401600060405180830381600087803b15801561039357600080fd5b505af11580156103a7573d6000803e3d6000fd5b505050506001600160a01b03838116600081815260016020908152604091829020805473ffffffffffffffffffffffffffffffffffffffff191690558151928352928516928201929092527f93421e1caa71c97b657f6549cf4ee1336fc49e2b14157cb6b3648b8adad376b3910160405180910390a1505050565b6040516301ffc9a760e01b8152635b5e139f60e01b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa15801561046d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104919190610b31565b6104ae5760405163072a998960e11b815260040160405180910390fd5b6001600160a01b0381811660009081526001602052604090205416156104e757604051630918c45360e21b815260040160405180910390fd5b6000816001600160a01b03166306fdde036040518163ffffffff1660e01b8152600401600060405180830381865afa158015610527573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261054f9190810190610b53565b60405160200161055f9190610bca565b60405160208183030381529060405290506000826001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa1580156105b0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105d89190810190610b53565b6040516020016105e89190610c0b565b60408051601f19818403018152908290526003546bffffffffffffffffffffffff19606087901b1660208401526034830152915060009060540160408051601f19818403018152919052805160209091012060038054919250600061064c83610c30565b9190505550600081604051610660906108eb565b8190604051809103906000f5905080158015610680573d6000803e3d6000fd5b506040516303bf912560e11b81529091506001600160a01b0382169063077f224a906106b490879087908a90600401610c57565b600060405180830381600087803b1580156106ce57600080fd5b505af11580156106e2573d6000803e3d6000fd5b505050506001600160a01b038581166000818152600160208190526040808320805473ffffffffffffffffffffffffffffffffffffffff199081169688169687179091556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910180549092168417909155517f40f18627ffa593d3a62b03127f0b4504c81d0a287270ccbc6ff96a38dc7f065c906107909088908890610c96565b60405180910390a35050505050565b6107a7610834565b6001600160a01b0381166108285760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6108318161088e565b50565b6000546001600160a01b031633146102d25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161081f565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b611a6c80610cbc83390190565b80356001600160a01b038116811461090f57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561095357610953610914565b604052919050565b600067ffffffffffffffff82111561097557610975610914565b50601f01601f191660200190565b60008060006060848603121561099857600080fd5b6109a1846108f8565b92506109af602085016108f8565b9150604084013567ffffffffffffffff8111156109cb57600080fd5b8401601f810186136109dc57600080fd5b80356109ef6109ea8261095b565b61092a565b818152876020838501011115610a0457600080fd5b816020840160208301376000602083830101528093505050509250925092565b600060208284031215610a3657600080fd5b5035919050565b60008060408385031215610a5057600080fd5b610a59836108f8565b9150610a67602084016108f8565b90509250929050565b600060208284031215610a8257600080fd5b610a8b826108f8565b9392505050565b60005b83811015610aad578181015183820152602001610a95565b83811115610abc576000848401525b50505050565b60008151808452610ada816020860160208601610a92565b601f01601f19169290920160200192915050565b6001600160a01b0383168152604060208201526000610b106040830184610ac2565b949350505050565b600060208284031215610b2a57600080fd5b5051919050565b600060208284031215610b4357600080fd5b81518015158114610a8b57600080fd5b600060208284031215610b6557600080fd5b815167ffffffffffffffff811115610b7c57600080fd5b8201601f81018413610b8d57600080fd5b8051610b9b6109ea8261095b565b818152856020838501011115610bb057600080fd5b610bc1826020830160208601610a92565b95945050505050565b60008251610bdc818460208701610a92565b7f20506f6f6c000000000000000000000000000000000000000000000000000000920191825250600501919050565b60008251610c1d818460208701610a92565b600760fc1b920191825250600101919050565b600060018201610c5057634e487b7160e01b600052601160045260246000fd5b5060010190565b606081526000610c6a6060830186610ac2565b8281036020840152610c7c8186610ac2565b9150506001600160a01b0383166040830152949350505050565b604081526000610ca96040830185610ac2565b8281036020840152610bc18185610ac256fe60a060405234801561001057600080fd5b5033608052608051611a19610053600039600081816103a3015281816104a40152818161065f0152818161069b01528181610b360152610b720152611a196000f3fe608060405234801561001057600080fd5b50600436106101a35760003560e01c806370a08231116100ee578063add9383f11610097578063c45a015511610071578063c45a01551461039e578063d505accf146103c5578063dd62ed3e146103d8578063e037a2c71461040357600080fd5b8063add9383f14610364578063afee80d914610378578063b41629711461038b57600080fd5b806395d89b41116100c857806395d89b4114610336578063983d95ce1461033e578063a9059cbb1461035157600080fd5b806370a08231146102e35780637ecebe001461030357806391c03b1b1461032357600080fd5b806330adf81f1161015057806338d52e0f1161012a57806338d52e0f1461028557806354fd4d50146102b0578063598b8e71146102d057600080fd5b806330adf81f1461023b578063313ce567146102625780633644e5151461027c57600080fd5b806318160ddd1161018157806318160ddd146101fe5780631b8854591461021557806323b872dd1461022857600080fd5b806306fdde03146101a8578063077f224a146101c6578063095ea7b3146101db575b600080fd5b6101b061040b565b6040516101bd919061136a565b60405180910390f35b6101d96101d4366004611445565b610499565b005b6101ee6101e93660046114b9565b61063b565b60405190151581526020016101bd565b61020760005481565b6040519081526020016101bd565b6102076102233660046114e3565b610652565b6101ee610236366004611531565b610789565b6102077f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b61026a601281565b60405160ff90911681526020016101bd565b61020760055481565b600754610298906001600160a01b031681565b6040516001600160a01b0390911681526020016101bd565b6101b0604051806040016040528060018152602001603160f81b81525081565b6101d96102de3660046115b9565b61081e565b6102076102f13660046115fb565b60016020526000908152604090205481565b6102076103113660046115fb565b60066020526000908152604090205481565b6101d9610331366004611616565b610981565b6101b06109ad565b6101d961034c3660046115b9565b6109ba565b6101ee61035f3660046114b9565b610b11565b6007546101ee90600160a01b900460ff1681565b61020761038636600461169d565b610b1e565b6101d96103993660046115fb565b610b2b565b6102987f000000000000000000000000000000000000000000000000000000000000000081565b6101d96103d33660046116b6565b610cb9565b6102076103e6366004611729565b600260209081526000928352604080842090915290825290205481565b610207610e7a565b600380546104189061175c565b80601f01602080910402602001604051908101604052809291908181526020018280546104449061175c565b80156104915780601f1061046657610100808354040283529160200191610491565b820191906000526020600020905b81548152906001019060200180831161047457829003601f168201915b505050505081565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146104e257604051632dc9a2c560e11b815260040160405180910390fd5b82516104f5906003906020860190611284565b508151610509906004906020850190611284565b50600780547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03831617905560405146907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f9061057090600390611796565b60408051918290038220828201825260018352603160f81b6020938401528151928301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66060820152608081018290523060a082015260c00160408051601f198184030181529082905280516020909101206005556007546001600160a01b0316907f1ad5258fd94fd6ce147b9bf86c9fa73f75ad24a4838ae307465cb85e4f88a8929061062d9060039060049061187f565b60405180910390a250505050565b6000610648338484610e8b565b5060015b92915050565b6000336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146106d357604051638b92f42960e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001660048201523360248201526044015b60405180910390fd5b60405163c47f002760e01b81526000906001600160a01b0385169063c47f00279061070290869060040161136a565b6020604051808303816000875af1158015610721573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074591906118ad565b90507fa5e1a4930625c531385a2387f6c7509e86e2c2e26395ef89e69580fbf23581cf84848360405161077a939291906118c6565b60405180910390a19392505050565b6001600160a01b038316600090815260026020908152604080832033845290915281205460001914610809576001600160a01b03841660009081526002602090815260408083203384529091529020546107e490839061190e565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b610814848484610eed565b5060019392505050565b600754600160a01b900460ff16156108495760405163213f4d8f60e21b815260040160405180910390fd5b600081900361086b5760405163251e5fcb60e11b815260040160405180910390fd5b60005b8181101561092657600083838381811061088a5761088a611925565b9050602002013590506108a7816008610f9590919063ffffffff16565b6108b057600080fd5b6007546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd90606401600060405180830381600087803b15801561090257600080fd5b505af1158015610916573d6000803e3d6000fd5b505050508160010191505061086e565b506109423361093d83670de0b6b3a764000061193b565b610fa8565b7f42b71104669d6b9b0ed0596b13bf72373d2139566545df2b53b72931c69657158282336040516109759392919061195a565b60405180910390a15050565b61099d61099684670de0b6b3a764000061193b565b8383611039565b6109a784846109ba565b50505050565b600480546104189061175c565b600754600160a01b900460ff16156109e55760405163213f4d8f60e21b815260040160405180910390fd5b6000819003610a075760405163251e5fcb60e11b815260040160405180910390fd5b610a2233610a1d83670de0b6b3a764000061193b565b61106a565b60005b81811015610add576000838383818110610a4157610a41611925565b905060200201359050610a5e8160086110f690919063ffffffff16565b610a6757600080fd5b6007546040516323b872dd60e01b8152306004820152336024820152604481018390526001600160a01b03909116906323b872dd90606401600060405180830381600087803b158015610ab957600080fd5b505af1158015610acd573d6000803e3d6000fd5b5050505081600101915050610a25565b507f7bba1845c3eeae05ee144781cd5e90a7f295e8e097186d1ca50d2fd3c78ae9148282336040516109759392919061195a565b6000610648338484610eed565b600061064c600883611102565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610ba557604051638b92f42960e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001660048201523360248201526044016106ca565b610baf600861110e565b600114610bcf5760405163047f394360e41b815260040160405180910390fd5b6000610bdc600882611102565b9050610be96008826110f6565b610bf257600080fd5b6007546040516323b872dd60e01b81523060048201526001600160a01b03848116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b158015610c4657600080fd5b505af1158015610c5a573d6000803e3d6000fd5b5050600780547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b17905550506040517ffd4851e957692bd2892519465342329cd312c3cfa252aefb8e631076638ee49b90600090a15050565b42841015610cda57604051639436330960e01b815260040160405180910390fd5b6005546001600160a01b038816600090815260066020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b919087610d2d836119c5565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e00160405160208183030381529060405280519060200120604051602001610da692919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015610e11573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381161580610e465750886001600160a01b0316816001600160a01b031614155b15610e645760405163068d22f760e11b815260040160405180910390fd5b610e6f898989610e8b565b505050505050505050565b6000610e86600861110e565b905090565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316600090815260016020526040902054610f1190829061190e565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610f419082906119de565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610ee09085815260200190565b6000610fa18383611118565b9392505050565b80600054610fb691906119de565b60009081556001600160a01b038316815260016020526040902054610fdc9082906119de565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061102d9085815260200190565b60405180910390a35050565b8051156110655760208101516040820151606083015160001a61106133308888858888610cb9565b5050505b505050565b6001600160a01b03821660009081526001602052604090205461108e90829061190e565b6001600160a01b038316600090815260016020526040812091909155546110b690829061190e565b60009081556040518281526001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200161102d565b6000610fa18383611167565b6000610fa1838361125a565b600061064c825490565b600081815260018301602052604081205461115f5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561064c565b50600061064c565b6000818152600183016020526040812054801561125057600061118b60018361190e565b855490915060009061119f9060019061190e565b90508181146112045760008660000182815481106111bf576111bf611925565b90600052602060002001549050808760000184815481106111e2576111e2611925565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080611215576112156119f6565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061064c565b600091505061064c565b600082600001828154811061127157611271611925565b9060005260206000200154905092915050565b8280546112909061175c565b90600052602060002090601f0160209004810192826112b257600085556112f8565b82601f106112cb57805160ff19168380011785556112f8565b828001600101855582156112f8579182015b828111156112f85782518255916020019190600101906112dd565b50611304929150611308565b5090565b5b808211156113045760008155600101611309565b6000815180845260005b8181101561134357602081850181015186830182015201611327565b81811115611355576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610fa1602083018461131d565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156113ae576113ae61137d565b604051601f8501601f19908116603f011681019082821181831017156113d6576113d661137d565b816040528093508581528686860111156113ef57600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011261141a57600080fd5b610fa183833560208501611393565b80356001600160a01b038116811461144057600080fd5b919050565b60008060006060848603121561145a57600080fd5b833567ffffffffffffffff8082111561147257600080fd5b61147e87838801611409565b9450602086013591508082111561149457600080fd5b506114a186828701611409565b9250506114b060408501611429565b90509250925092565b600080604083850312156114cc57600080fd5b6114d583611429565b946020939093013593505050565b600080604083850312156114f657600080fd5b6114ff83611429565b9150602083013567ffffffffffffffff81111561151b57600080fd5b61152785828601611409565b9150509250929050565b60008060006060848603121561154657600080fd5b61154f84611429565b925061155d60208501611429565b9150604084013590509250925092565b60008083601f84011261157f57600080fd5b50813567ffffffffffffffff81111561159757600080fd5b6020830191508360208260051b85010111156115b257600080fd5b9250929050565b600080602083850312156115cc57600080fd5b823567ffffffffffffffff8111156115e357600080fd5b6115ef8582860161156d565b90969095509350505050565b60006020828403121561160d57600080fd5b610fa182611429565b6000806000806060858703121561162c57600080fd5b843567ffffffffffffffff8082111561164457600080fd5b6116508883890161156d565b909650945060208701359350604087013591508082111561167057600080fd5b508501601f8101871361168257600080fd5b61169187823560208401611393565b91505092959194509250565b6000602082840312156116af57600080fd5b5035919050565b600080600080600080600060e0888a0312156116d157600080fd5b6116da88611429565b96506116e860208901611429565b95506040880135945060608801359350608088013560ff8116811461170c57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561173c57600080fd5b61174583611429565b915061175360208401611429565b90509250929050565b600181811c9082168061177057607f821691505b60208210810361179057634e487b7160e01b600052602260045260246000fd5b50919050565b60008083546117a48161175c565b600182811680156117bc57600181146117cd576117fc565b60ff198416875282870194506117fc565b8760005260208060002060005b858110156117f35781548a8201529084019082016117da565b50505082870194505b50929695505050505050565b600081546118158161175c565b808552602060018381168015611832576001811461184657611874565b60ff19851688840152604088019550611874565b866000528260002060005b8581101561186c5781548a8201860152908301908401611851565b890184019650505b505050505092915050565b6040815260006118926040830185611808565b82810360208401526118a48185611808565b95945050505050565b6000602082840312156118bf57600080fd5b5051919050565b6001600160a01b03841681526060602082015260006118e8606083018561131d565b9050826040830152949350505050565b634e487b7160e01b600052601160045260246000fd5b600082821015611920576119206118f8565b500390565b634e487b7160e01b600052603260045260246000fd5b6000816000190483118215151615611955576119556118f8565b500290565b6040815282604082015260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84111561199357600080fd5b8360051b80866060850137606081840101905060008152809150506001600160a01b0383166020830152949350505050565b6000600182016119d7576119d76118f8565b5060010190565b600082198211156119f1576119f16118f8565b500190565b634e487b7160e01b600052603160045260246000fdfea164736f6c634300080d000aa164736f6c634300080d000a";

type ERC721PoolFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721PoolFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721PoolFactory__factory extends ContractFactory {
  constructor(...args: ERC721PoolFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC721PoolFactory";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721PoolFactory> {
    return super.deploy(overrides || {}) as Promise<ERC721PoolFactory>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC721PoolFactory {
    return super.attach(address) as ERC721PoolFactory;
  }
  connect(signer: Signer): ERC721PoolFactory__factory {
    return super.connect(signer) as ERC721PoolFactory__factory;
  }
  static readonly contractName: "ERC721PoolFactory";
  public readonly contractName: "ERC721PoolFactory";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721PoolFactoryInterface {
    return new utils.Interface(_abi) as ERC721PoolFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721PoolFactory {
    return new Contract(address, _abi, signerOrProvider) as ERC721PoolFactory;
  }
}
