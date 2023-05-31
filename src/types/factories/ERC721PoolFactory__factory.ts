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
  "0x6080604052600060035534801561001557600080fd5b5061001f33610024565b610074565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6124d8806100836000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80639049f9d211610076578063bbe4f6db1161005b578063bbe4f6db1461015e578063efde4e6414610187578063f2fde38b1461018f57600080fd5b80639049f9d214610134578063affed0e01461014757600080fd5b8063715018a6116100a7578063715018a61461010857806385309f8b146101105780638da5cb5b1461012357600080fd5b806317d08140146100c357806341d1de97146100d8575b600080fd5b6100d66100d1366004610934565b6101a2565b005b6100eb6100e63660046109d5565b610296565b6040516001600160a01b0390911681526020015b60405180910390f35b6100d66102c0565b6100d661011e3660046109ee565b6102d4565b6000546001600160a01b03166100eb565b6100d6610142366004610a21565b6103d3565b61015060035481565b6040519081526020016100ff565b6100eb61016c366004610a21565b6001602052600090815260409020546001600160a01b031681565b600254610150565b6100d661019d366004610a21565b610750565b6101aa6107e5565b6001600160a01b03838116600090815260016020526040902054166101e25760405163fd3cb6e560e01b815260040160405180910390fd5b6001600160a01b038216610209576040516341f561ed60e01b815260040160405180910390fd5b6001600160a01b0380841660009081526001602052604090819020549051631b88545960e01b81529116908190631b8854599061024c9086908690600401610a9f565b6020604051808303816000875af115801561026b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061028f9190610ac9565b5050505050565b600281815481106102a657600080fd5b6000918252602090912001546001600160a01b0316905081565b6102c86107e5565b6102d2600061083f565b565b6102dc6107e5565b6001600160a01b0380831660009081526001602052604090205416806103155760405163fd3cb6e560e01b815260040160405180910390fd5b6001600160a01b03821661033c5760405163764ce46560e01b815260040160405180910390fd5b60405163b416297160e01b81526001600160a01b03838116600483015282919082169063b416297190602401600060405180830381600087803b15801561038257600080fd5b505af1158015610396573d6000803e3d6000fd5b5050506001600160a01b039094166000908152600160205260409020805473ffffffffffffffffffffffffffffffffffffffff1916905550505050565b6040516301ffc9a760e01b8152635b5e139f60e01b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa15801561041e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104429190610ae2565b61045f5760405163072a998960e11b815260040160405180910390fd5b6001600160a01b03818116600090815260016020526040902054161561049857604051630918c45360e21b815260040160405180910390fd5b6000816001600160a01b03166306fdde036040518163ffffffff1660e01b8152600401600060405180830381865afa1580156104d8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105009190810190610b04565b6040516020016105109190610b7b565b60405160208183030381529060405290506000826001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015610561573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105899190810190610b04565b6040516020016105999190610bbc565b60408051601f19818403018152908290526003546bffffffffffffffffffffffff19606087901b1660208401526034830152915060009060540160408051601f1981840301815291905280516020909101206003805491925060006105fd83610be1565b91905055506000816040516106119061089c565b8190604051809103906000f5905080158015610631573d6000803e3d6000fd5b506040516303bf912560e11b81529091506001600160a01b0382169063077f224a9061066590879087908a90600401610c08565b600060405180830381600087803b15801561067f57600080fd5b505af1158015610693573d6000803e3d6000fd5b505050506001600160a01b038581166000818152600160208190526040808320805473ffffffffffffffffffffffffffffffffffffffff199081169688169687179091556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910180549092168417909155517f40f18627ffa593d3a62b03127f0b4504c81d0a287270ccbc6ff96a38dc7f065c906107419088908890610c47565b60405180910390a35050505050565b6107586107e5565b6001600160a01b0381166107d95760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6107e28161083f565b50565b6000546001600160a01b031633146102d25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016107d0565b600080546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61185f80610c6d83390190565b80356001600160a01b03811681146108c057600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610904576109046108c5565b604052919050565b600067ffffffffffffffff821115610926576109266108c5565b50601f01601f191660200190565b60008060006060848603121561094957600080fd5b610952846108a9565b9250610960602085016108a9565b9150604084013567ffffffffffffffff81111561097c57600080fd5b8401601f8101861361098d57600080fd5b80356109a061099b8261090c565b6108db565b8181528760208385010111156109b557600080fd5b816020840160208301376000602083830101528093505050509250925092565b6000602082840312156109e757600080fd5b5035919050565b60008060408385031215610a0157600080fd5b610a0a836108a9565b9150610a18602084016108a9565b90509250929050565b600060208284031215610a3357600080fd5b610a3c826108a9565b9392505050565b60005b83811015610a5e578181015183820152602001610a46565b83811115610a6d576000848401525b50505050565b60008151808452610a8b816020860160208601610a43565b601f01601f19169290920160200192915050565b6001600160a01b0383168152604060208201526000610ac16040830184610a73565b949350505050565b600060208284031215610adb57600080fd5b5051919050565b600060208284031215610af457600080fd5b81518015158114610a3c57600080fd5b600060208284031215610b1657600080fd5b815167ffffffffffffffff811115610b2d57600080fd5b8201601f81018413610b3e57600080fd5b8051610b4c61099b8261090c565b818152856020838501011115610b6157600080fd5b610b72826020830160208601610a43565b95945050505050565b60008251610b8d818460208701610a43565b7f20506f6f6c000000000000000000000000000000000000000000000000000000920191825250600501919050565b60008251610bce818460208701610a43565b600760fc1b920191825250600101919050565b600060018201610c0157634e487b7160e01b600052601160045260246000fd5b5060010190565b606081526000610c1b6060830186610a73565b8281036020840152610c2d8186610a73565b9150506001600160a01b0383166040830152949350505050565b604081526000610c5a6040830185610a73565b8281036020840152610b728185610a7356fe60a060405234801561001057600080fd5b503360805260805161180c610053600039600081816103a2015281816105cd01528181610788015281816107c401528181610ac20152610afe015261180c6000f3fe608060405234801561001057600080fd5b50600436106101a25760003560e01c80636e553f65116100ee578063add9383f11610097578063c45a015511610071578063c45a01551461039d578063d505accf146103c4578063dd62ed3e146103d7578063e037a2c71461040257600080fd5b8063add9383f14610363578063afee80d914610377578063b41629711461038a57600080fd5b806395d89b41116100c857806395d89b4114610335578063a20e29151461033d578063a9059cbb1461035057600080fd5b80636e553f65146102e257806370a08231146102f55780637ecebe001461031557600080fd5b806323b872dd116101505780633644e5151161012a5780633644e5151461028e57806338d52e0f1461029757806354fd4d50146102c257600080fd5b806323b872dd1461023a57806330adf81f1461024d578063313ce5671461027457600080fd5b8063095ea7b311610181578063095ea7b3146101ed57806318160ddd146102105780631b8854591461022757600080fd5b8062f714ce146101a757806306fdde03146101bc578063077f224a146101da575b600080fd5b6101ba6101b53660046112b1565b61040a565b005b6101c4610534565b6040516101d1919061132a565b60405180910390f35b6101ba6101e83660046113e0565b6105c2565b6102006101fb366004611454565b610764565b60405190151581526020016101d1565b61021960005481565b6040519081526020016101d1565b61021961023536600461147e565b61077b565b6102006102483660046114cc565b6108ad565b6102197f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b61027c601281565b60405160ff90911681526020016101d1565b61021960055481565b6007546102aa906001600160a01b031681565b6040516001600160a01b0390911681526020016101d1565b6101c4604051806040016040528060018152602001603160f81b81525081565b6101ba6102f03660046112b1565b610942565b610219610303366004611508565b60016020526000908152604090205481565b610219610323366004611508565b60066020526000908152604090205481565b6101c4610a83565b61020061034b366004611523565b610a90565b61020061035e366004611454565b610a9d565b60075461020090600160a01b900460ff1681565b610219610385366004611523565b610aaa565b6101ba610398366004611508565b610ab7565b6102aa7f000000000000000000000000000000000000000000000000000000000000000081565b6101ba6103d236600461153c565b610c4e565b6102196103e53660046115af565b600260209081526000928352604080842090915290825290205481565b610219610e0f565b600754600160a01b900460ff16156104355760405163213f4d8f60e21b815260040160405180910390fd5b610440600883610e20565b61046557604051637611c25d60e01b8152600481018390526024015b60405180910390fd5b61047733670de0b6b3a7640000610e33565b6007546040516323b872dd60e01b81523060048201526001600160a01b03838116602483015260448201859052909116906323b872dd90606401600060405180830381600087803b1580156104cb57600080fd5b505af11580156104df573d6000803e3d6000fd5b5050604080518581526001600160a01b038516602082015233918101919091527fa51bb7c2c2049ab09fbff5561211a4ee34b3b4cee74c42f1bce5461cd4ef3f8d925060600190505b60405180910390a15050565b60038054610541906115d9565b80601f016020809104026020016040519081016040528092919081815260200182805461056d906115d9565b80156105ba5780601f1061058f576101008083540402835291602001916105ba565b820191906000526020600020905b81548152906001019060200180831161059d57829003601f168201915b505050505081565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461060b57604051632dc9a2c560e11b815260040160405180910390fd5b825161061e9060039060208601906111fc565b5081516106329060049060208501906111fc565b50600780547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03831617905560405146907f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f9061069990600390611613565b60408051918290038220828201825260018352603160f81b6020938401528151928301939093528101919091527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc66060820152608081018290523060a082015260c00160408051601f198184030181529082905280516020909101206005556007546001600160a01b0316907f1ad5258fd94fd6ce147b9bf86c9fa73f75ad24a4838ae307465cb85e4f88a89290610756906003906004906116fc565b60405180910390a250505050565b6000610771338484610ec7565b5060015b92915050565b6000336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146107f757604051638b92f42960e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016600482015233602482015260440161045c565b60405163c47f002760e01b81526000906001600160a01b0385169063c47f00279061082690869060040161132a565b6020604051808303816000875af1158015610845573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610869919061172a565b90507fa5e1a4930625c531385a2387f6c7509e86e2c2e26395ef89e69580fbf23581cf84848360405161089e93929190611743565b60405180910390a19392505050565b6001600160a01b03831660009081526002602090815260408083203384529091528120546000191461092d576001600160a01b038416600090815260026020908152604080832033845290915290205461090890839061178b565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b610938848484610f29565b5060019392505050565b600754600160a01b900460ff161561096d5760405163213f4d8f60e21b815260040160405180910390fd5b6001600160a01b03811661099457604051630c85813960e41b815260040160405180910390fd5b61099f600883610fd1565b6109bf576040516311ffca0560e01b81526004810183905260240161045c565b6007546040516323b872dd60e01b8152336004820152306024820152604481018490526001600160a01b03909116906323b872dd90606401600060405180830381600087803b158015610a1157600080fd5b505af1158015610a25573d6000803e3d6000fd5b50505050610a3b81670de0b6b3a7640000610fdd565b604080518381526001600160a01b038316602082015233918101919091527fa3d2cbcb90e0658235d4ba62aed9a50c231df9bc5bbfb74c95badbc798f38d1a90606001610528565b60048054610541906115d9565b6000610775600883611062565b6000610771338484610f29565b600061077560088361107a565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610b3157604051638b92f42960e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016600482015233602482015260440161045c565b610b3b6008611086565b600114610b5b5760405163047f394360e41b815260040160405180910390fd5b6000610b6860088261107a565b9050610b75600882610e20565b506007546040516323b872dd60e01b81523060048201526001600160a01b03848116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b158015610bca57600080fd5b505af1158015610bde573d6000803e3d6000fd5b5050600780547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16600160a01b1790555050604080518281526001600160a01b03841660208201527faffd75e6ee86fd1fb33b970cc443b834b4647d4738eebe6206b75449db63979c9101610528565b42841015610c6f57604051639436330960e01b815260040160405180910390fd5b6005546001600160a01b038816600090815260066020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b919087610cc2836117a2565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e00160405160208183030381529060405280519060200120604051602001610d3b92919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015610da6573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381161580610ddb5750886001600160a01b0316816001600160a01b031614155b15610df95760405163068d22f760e11b815260040160405180910390fd5b610e04898989610ec7565b505050505050505050565b6000610e1b6008611086565b905090565b6000610e2c8383611090565b9392505050565b6001600160a01b038216600090815260016020526040902054610e5790829061178b565b6001600160a01b03831660009081526001602052604081209190915554610e7f90829061178b565b60009081556040518281526001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906020015b60405180910390a35050565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316600090815260016020526040902054610f4d90829061178b565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610f7d9082906117bb565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610f1c9085815260200190565b6000610e2c8383611183565b80600054610feb91906117bb565b60009081556001600160a01b0383168152600160205260409020546110119082906117bb565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610ebb9085815260200190565b60008181526001830160205260408120541515610e2c565b6000610e2c83836111d2565b6000610775825490565b600081815260018301602052604081205480156111795760006110b460018361178b565b85549091506000906110c89060019061178b565b905081811461112d5760008660000182815481106110e8576110e86117d3565b906000526020600020015490508087600001848154811061110b5761110b6117d3565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061113e5761113e6117e9565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610775565b6000915050610775565b60008181526001830160205260408120546111ca57508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610775565b506000610775565b60008260000182815481106111e9576111e96117d3565b9060005260206000200154905092915050565b828054611208906115d9565b90600052602060002090601f01602090048101928261122a5760008555611270565b82601f1061124357805160ff1916838001178555611270565b82800160010185558215611270579182015b82811115611270578251825591602001919060010190611255565b5061127c929150611280565b5090565b5b8082111561127c5760008155600101611281565b80356001600160a01b03811681146112ac57600080fd5b919050565b600080604083850312156112c457600080fd5b823591506112d460208401611295565b90509250929050565b6000815180845260005b81811015611303576020818501810151868301820152016112e7565b81811115611315576000602083870101525b50601f01601f19169290920160200192915050565b602081526000610e2c60208301846112dd565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261136457600080fd5b813567ffffffffffffffff8082111561137f5761137f61133d565b604051601f8301601f19908116603f011681019082821181831017156113a7576113a761133d565b816040528381528660208588010111156113c057600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000606084860312156113f557600080fd5b833567ffffffffffffffff8082111561140d57600080fd5b61141987838801611353565b9450602086013591508082111561142f57600080fd5b5061143c86828701611353565b92505061144b60408501611295565b90509250925092565b6000806040838503121561146757600080fd5b61147083611295565b946020939093013593505050565b6000806040838503121561149157600080fd5b61149a83611295565b9150602083013567ffffffffffffffff8111156114b657600080fd5b6114c285828601611353565b9150509250929050565b6000806000606084860312156114e157600080fd5b6114ea84611295565b92506114f860208501611295565b9150604084013590509250925092565b60006020828403121561151a57600080fd5b610e2c82611295565b60006020828403121561153557600080fd5b5035919050565b600080600080600080600060e0888a03121561155757600080fd5b61156088611295565b965061156e60208901611295565b95506040880135945060608801359350608088013560ff8116811461159257600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156115c257600080fd5b6115cb83611295565b91506112d460208401611295565b600181811c908216806115ed57607f821691505b60208210810361160d57634e487b7160e01b600052602260045260246000fd5b50919050565b6000808354611621816115d9565b60018281168015611639576001811461164a57611679565b60ff19841687528287019450611679565b8760005260208060002060005b858110156116705781548a820152908401908201611657565b50505082870194505b50929695505050505050565b60008154611692816115d9565b8085526020600183811680156116af57600181146116c3576116f1565b60ff198516888401526040880195506116f1565b866000528260002060005b858110156116e95781548a82018601529083019084016116ce565b890184019650505b505050505092915050565b60408152600061170f6040830185611685565b82810360208401526117218185611685565b95945050505050565b60006020828403121561173c57600080fd5b5051919050565b6001600160a01b038416815260606020820152600061176560608301856112dd565b9050826040830152949350505050565b634e487b7160e01b600052601160045260246000fd5b60008282101561179d5761179d611775565b500390565b6000600182016117b4576117b4611775565b5060010190565b600082198211156117ce576117ce611775565b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea164736f6c634300080d000aa164736f6c634300080d000a";

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
