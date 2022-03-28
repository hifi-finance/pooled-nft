/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { VaultFactory, VaultFactoryInterface } from "../VaultFactory";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
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
  "0x608060405234801561001057600080fd5b50611a28806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063fbd4834c14610030575b600080fd5b61004361003e366004610134565b610045565b005b60008585858585604051610058906100de565b6100669594939291906101ed565b604051809103906000f080158015610082573d6000803e3d6000fd5b509050806001600160a01b0316826001600160a01b03167fb3ba352c31f75f8e7f697e88e34c64e8414626a1bac6a9d68f8035030083acb2888888886040516100ce9493929190610230565b60405180910390a3505050505050565b6117b98061026383390190565b60008083601f8401126100fd57600080fd5b50813567ffffffffffffffff81111561011557600080fd5b60208301915083602082850101111561012d57600080fd5b9250929050565b60008060008060006060868803121561014c57600080fd5b853567ffffffffffffffff8082111561016457600080fd5b61017089838a016100eb565b9097509550602088013591508082111561018957600080fd5b50610196888289016100eb565b90945092505060408601356001600160a01b03811681146101b657600080fd5b809150509295509295909350565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6060815260006102016060830187896101c4565b82810360208401526102148186886101c4565b9150506001600160a01b03831660408301529695505050505050565b6040815260006102446040830186886101c4565b82810360208401526102578185876101c4565b97965050505050505056fe60806040523480156200001157600080fd5b50604051620017b9380380620017b9833981016040819052620000349162000203565b8251839083906200004d90600390602085019062000090565b5080516200006390600490602084019062000090565b5050600580546001600160a01b0319166001600160a01b03939093169290921790915550620002cc915050565b8280546200009e9062000290565b90600052602060002090601f016020900481019282620000c257600085556200010d565b82601f10620000dd57805160ff19168380011785556200010d565b828001600101855582156200010d579182015b828111156200010d578251825591602001919060010190620000f0565b506200011b9291506200011f565b5090565b5b808211156200011b576000815560010162000120565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200015e57600080fd5b81516001600160401b03808211156200017b576200017b62000136565b604051601f8301601f19908116603f01168101908282118183101715620001a657620001a662000136565b81604052838152602092508683858801011115620001c357600080fd5b600091505b83821015620001e75785820183015181830184015290820190620001c8565b83821115620001f95760008385830101525b9695505050505050565b6000806000606084860312156200021957600080fd5b83516001600160401b03808211156200023157600080fd5b6200023f878388016200014c565b945060208601519150808211156200025657600080fd5b5062000265868287016200014c565b604086015190935090506001600160a01b03811681146200028557600080fd5b809150509250925092565b600181811c90821680620002a557607f821691505b602082108103620002c657634e487b7160e01b600052602260045260246000fd5b50919050565b6114dd80620002dc6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80635c5b69a911610097578063a457c2d711610066578063a457c2d714610206578063a9059cbb14610219578063c4c9741b1461022c578063dd62ed3e1461023f57600080fd5b80635c5b69a9146101ad57806370a08231146101c257806395d89b41146101eb578063a3ff19a4146101f357600080fd5b806323b872dd116100d357806323b872dd1461014d578063313ce5671461016057806338d52e0f1461016f578063395093511461019a57600080fd5b806306fdde03146100fa578063095ea7b31461011857806318160ddd1461013b575b600080fd5b610102610278565b60405161010f91906110a2565b60405180910390f35b61012b610126366004611113565b61030a565b604051901515815260200161010f565b6002545b60405190815260200161010f565b61012b61015b36600461113d565b610324565b6040516012815260200161010f565b600554610182906001600160a01b031681565b6040516001600160a01b03909116815260200161010f565b61012b6101a8366004611113565b610348565b6101c06101bb3660046111c5565b610387565b005b61013f6101d0366004611219565b6001600160a01b031660009081526020819052604090205490565b6101026104e9565b6101c0610201366004611234565b6104f8565b61012b610214366004611113565b610724565b61012b610227366004611113565b6107d3565b6101c061023a3660046112b5565b6107e1565b61013f61024d366004611313565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461028790611346565b80601f01602080910402602001604051908101604052809291908181526020018280546102b390611346565b80156103005780601f106102d557610100808354040283529160200191610300565b820191906000526020600020905b8154815290600101906020018083116102e357829003601f168201915b5050505050905090565b600033610318818585610968565b60019150505b92915050565b600033610332858285610a8d565b61033d858585610b1f565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091906103189082908690610382908790611396565b610968565b8160008190036103aa57604051631d90bf4160e21b815260040160405180910390fd5b6001600160a01b0382166103d15760405163e398b79960e01b815260040160405180910390fd5b60005b818110156104845760008585838181106103f0576103f06113ae565b90506020020135905061040d816006610d1c90919063ffffffff16565b506005546040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b03909116906323b872dd90606401600060405180830381600087803b15801561046057600080fd5b505af1158015610474573d6000803e3d6000fd5b50505050816001019150506103d4565b506104a08261049b83670de0b6b3a76400006113c4565b610d2f565b816001600160a01b03167ffe3e53059d987c63ffe4d5a45d9130265a9417099abcedf2b2a264a9c750823e85856040516104db929190611432565b60405180910390a250505050565b60606004805461028790611346565b8382600082900361051c57604051631d90bf4160e21b815260040160405180910390fd5b80821461053c57604051639853f1fd60e01b815260040160405180910390fd5b6001600160a01b0383166105635760405163e398b79960e01b815260040160405180910390fd5b60005b828110156106d3576005546001600160a01b03166323b872dd33308b8b86818110610593576105936113ae565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e088901b1681526001600160a01b03958616600482015294909316602485015250602090910201356044820152606401600060405180830381600087803b15801561060257600080fd5b505af1158015610616573d6000803e3d6000fd5b50506005546001600160a01b031691506323b872dd90503086898986818110610641576106416113ae565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e088901b1681526001600160a01b03958616600482015294909316602485015250602090910201356044820152606401600060405180830381600087803b1580156106b057600080fd5b505af11580156106c4573d6000803e3d6000fd5b50505050806001019050610566565b50826001600160a01b03167f0482325a8e0d87a795f1b932f4864348776133a209264b40b05b9a428dcd799b88888888604051610713949392919061144e565b60405180910390a250505050505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156107c65760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61033d8286868403610968565b600033610318818585610b1f565b81600085900361080457604051631d90bf4160e21b815260040160405180910390fd5b61081681670de0b6b3a76400006113c4565b851461083557604051639853f1fd60e01b815260040160405180910390fd5b6001600160a01b03821661085c5760405163e398b79960e01b815260040160405180910390fd5b6108663386610e0e565b60005b8181101561091b576000858583818110610885576108856113ae565b9050602002013590506108a2816006610f5490919063ffffffff16565b506005546040516323b872dd60e01b81523060048201526001600160a01b03868116602483015260448201849052909116906323b872dd90606401600060405180830381600087803b1580156108f757600080fd5b505af115801561090b573d6000803e3d6000fd5b5050505081600101915050610869565b50816001600160a01b03167f4a9f43dc50f4433ceaad8dd954b2eb7ab081462d4e95eedfc853d76840d7664286868660405161095993929190611480565b60405180910390a25050505050565b6001600160a01b0383166109ca5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016107bd565b6001600160a01b038216610a2b5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016107bd565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610b195781811015610b0c5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016107bd565b610b198484848403610968565b50505050565b6001600160a01b038316610b9b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016107bd565b6001600160a01b038216610bfd5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016107bd565b6001600160a01b03831660009081526020819052604090205481811015610c8c5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016107bd565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610cc3908490611396565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610d0f91815260200190565b60405180910390a3610b19565b6000610d288383610f60565b9392505050565b6001600160a01b038216610d855760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016107bd565b8060026000828254610d979190611396565b90915550506001600160a01b03821660009081526020819052604081208054839290610dc4908490611396565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610e6e5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016107bd565b6001600160a01b03821660009081526020819052604090205481811015610ee25760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016107bd565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610f119084906114a3565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610a80565b6000610d288383610faf565b6000818152600183016020526040812054610fa75750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561031e565b50600061031e565b60008181526001830160205260408120548015611098576000610fd36001836114a3565b8554909150600090610fe7906001906114a3565b905081811461104c576000866000018281548110611007576110076113ae565b906000526020600020015490508087600001848154811061102a5761102a6113ae565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061105d5761105d6114ba565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061031e565b600091505061031e565b600060208083528351808285015260005b818110156110cf578581018301518582016040015282016110b3565b818111156110e1576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461110e57600080fd5b919050565b6000806040838503121561112657600080fd5b61112f836110f7565b946020939093013593505050565b60008060006060848603121561115257600080fd5b61115b846110f7565b9250611169602085016110f7565b9150604084013590509250925092565b60008083601f84011261118b57600080fd5b50813567ffffffffffffffff8111156111a357600080fd5b6020830191508360208260051b85010111156111be57600080fd5b9250929050565b6000806000604084860312156111da57600080fd5b833567ffffffffffffffff8111156111f157600080fd5b6111fd86828701611179565b90945092506112109050602085016110f7565b90509250925092565b60006020828403121561122b57600080fd5b610d28826110f7565b60008060008060006060868803121561124c57600080fd5b853567ffffffffffffffff8082111561126457600080fd5b61127089838a01611179565b9097509550602088013591508082111561128957600080fd5b5061129688828901611179565b90945092506112a99050604087016110f7565b90509295509295909350565b600080600080606085870312156112cb57600080fd5b84359350602085013567ffffffffffffffff8111156112e957600080fd5b6112f587828801611179565b90945092506113089050604086016110f7565b905092959194509250565b6000806040838503121561132657600080fd5b61132f836110f7565b915061133d602084016110f7565b90509250929050565b600181811c9082168061135a57607f821691505b60208210810361137a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156113a9576113a9611380565b500190565b634e487b7160e01b600052603260045260246000fd5b60008160001904831182151516156113de576113de611380565b500290565b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561141557600080fd5b8260051b8083602087013760009401602001938452509192915050565b6020815260006114466020830184866113e3565b949350505050565b6040815260006114626040830186886113e3565b82810360208401526114758185876113e3565b979650505050505050565b83815260406020820152600061149a6040830184866113e3565b95945050505050565b6000828210156114b5576114b5611380565b500390565b634e487b7160e01b600052603160045260246000fdfea164736f6c634300080d000aa164736f6c634300080d000a";

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
