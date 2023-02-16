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
  "0x60a06040523480156200001157600080fd5b50620000467f9e24b50b47aefd8516303a8d91e537aca546c7d0ba7b90cff5dd62b5f0d8df6860001b620000e860201b60201c565b6200007a7f10021f243fd24734090c8e6396fd71f5a319ac7b1587bdf13f28bf03fa468f3860001b620000e860201b60201c565b620000ae7f39fa4293ab6c032f1869e77a654952dea63b06796c91b22cba59b277306151c660001b620000e860201b60201c565b3373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050620000eb565b50565b6080516125766200010e6000396000818161049a015261105c01526125766000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806338d52e0f116100b257806395d89b4111610081578063c45a015511610066578063c45a01551461031c578063d505accf1461033a578063dd62ed3e146103565761011b565b806395d89b41146102ce578063a9059cbb146102ec5761011b565b806338d52e0f1461023257806354fd4d501461025057806370a082311461026e5780637ecebe001461029e5761011b565b806323b872dd116100ee57806323b872dd146101a857806330adf81f146101d8578063313ce567146101f65780633644e515146102145761011b565b806306fdde0314610120578063077f224a1461013e578063095ea7b31461015a57806318160ddd1461018a575b600080fd5b610128610386565b6040516101359190611b65565b60405180910390f35b61015860048036038101906101539190611d2e565b610414565b005b610174600480360381019061016f9190611def565b610972565b6040516101819190611e4a565b60405180910390f35b610192610a65565b60405161019f9190611e74565b60405180910390f35b6101c260048036038101906101bd9190611e8f565b610a6b565b6040516101cf9190611e4a565b60405180910390f35b6101e0610e18565b6040516101ed9190611efb565b60405180910390f35b6101fe610e3f565b60405161020b9190611f32565b60405180910390f35b61021c610e44565b6040516102299190611efb565b60405180910390f35b61023a610e4a565b6040516102479190611f5c565b60405180910390f35b610258610e70565b6040516102659190611b65565b60405180910390f35b61028860048036038101906102839190611f77565b610ea9565b6040516102959190611e74565b60405180910390f35b6102b860048036038101906102b39190611f77565b610ec1565b6040516102c59190611e74565b60405180910390f35b6102d6610ed9565b6040516102e39190611b65565b60405180910390f35b61030660048036038101906103019190611def565b610f67565b6040516103139190611e4a565b60405180910390f35b61032461105a565b6040516103319190611f5c565b60405180910390f35b610354600480360381019061034f9190611ffc565b61107e565b005b610370600480360381019061036b919061209e565b611580565b60405161037d9190611e74565b60405180910390f35b600380546103939061210d565b80601f01602080910402602001604051908101604052809291908181526020018280546103bf9061210d565b801561040c5780601f106103e15761010080835404028352916020019161040c565b820191906000526020600020905b8154815290600101906020018083116103ef57829003601f168201915b505050505081565b6104407fb0b33519f0b6a85754e73406e752262745eac9a27b5c735a197cec9d2612565960001b6115a5565b61046c7f77e0424b13ca7f819020ee8af6df07a7c0389ed0b672a60e717d503145f2c3ab60001b6115a5565b6104987f1c1cbbdc6bf4e99c14a589316d388cf441a295d17f1609086ef8c30871a869c260001b6115a5565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610575576105177fa90c866fcda3f1667abbad64d4674ccaf787775ab6a45ef31d41320b89b598b160001b6115a5565b6105437f5614e69321cebbfcf124f5b8775f8d86fced81ec06add820699fcc705f27340360001b6115a5565b6040517f5b93458a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105a17f79fc9d2d502b7e1852b89737492079bb5b94160181a510da66d0c29ce09e737e60001b6115a5565b6105cd7fa8393613f4bf29194f04c1f88456827ce02236478e32c302abe684e1941602e460001b6115a5565b6105f97f80b4dd115c093e1782c305ee4d64b5715040c9cb3923fdaabeb118abfea00c7860001b6115a5565b826003908051906020019061060f929190611a29565b5061063c7f4f1f1b3bdbf82c6e5f36c0c08822178e7b857c70f696da656710a1c74518c6bf60001b6115a5565b6106687f9f2f3f09c339f978ade6471ae5883ce978816265a795aac3e5ec30d34a625dbd60001b6115a5565b816004908051906020019061067e929190611a29565b506106ab7f2ba0d307e1df9aa8f49b8101aebd7247bbe98540f44d803d6ab51dc798cab91760001b6115a5565b6106d77f52a497e622fb6b69a8d6bc000d1cb48ee0f0463131ce7c16bdd475609582089560001b6115a5565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506107447f3799c8d0cf626f1919b815e084f6bbf540e3d93ad3f8e95a6b537b3ae55562ef60001b6115a5565b6107707f45a225a62aced532f1710cca65fc7d90fb7943f04d2701b2813091d5d9ae799460001b6115a5565b600061079e7f92954d15024749d45912ba1cd8169e4d39a3e56c13ac6853a9cd7b4deff2ea7060001b6115a5565b4690506107cd7f5c98fbf33113b7151dc4a34aef31b9ecfb8bab7b013a9ddc882651be050ce7df60001b6115a5565b6107f97f0df6c633c1fd4354cebe411e0ab7753e5447820484b6df7c46d1adec666f2bc560001b6115a5565b7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f600360405161082991906121dd565b60405180910390206040518060400160405280600181526020017f31000000000000000000000000000000000000000000000000000000000000008152508051906020012083306040516020016108849594939291906121f4565b604051602081830303815290604052805190602001206005819055506108cc7fd60cb65e1eea965d5435aa1ef11181fc6fc1cfd73703faec343dac24d176586a60001b6115a5565b6108f87f479e5814bbf01f1662059fc320c8d29f7a5cd9b3daf493de896a01c6b1259e7160001b6115a5565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f1ad5258fd94fd6ce147b9bf86c9fa73f75ad24a4838ae307465cb85e4f88a892600360046040516109649291906122dc565b60405180910390a250505050565b60006109a07f60d77ee511b61102ac23e4a8bf3d41f0aaaaec8c08f9b1241c03d79e14921a7260001b6115a5565b6109cc7f162e4d26cb3243e10e2c944b221e1909ad6b2bc8cca196ba76b99063e36bc19660001b6115a5565b6109f87f4db300b73dfe95c5d9b89ed24cc549593559f36f49f1b0a6e7462d89240c3d1560001b6115a5565b610a033384846115a8565b610a2f7f70556af6d6cfb17892d315fb080c9610e2ced004205071aef94d333b9af6fbc060001b6115a5565b610a5b7f012728e6995ddda65b9e0cdc6110d3d5f08cd619f48fe596e05913c51d24fd0f60001b6115a5565b6001905092915050565b60005481565b6000610a997f60434d6eb9ce9e3008b2f3076753545237e1497f061c2e3e04091c2e19042f2360001b6115a5565b610ac57fb2554e79f613672674b3e4b63d4ab942d3e39a1df871387567a090fa548c047260001b6115a5565b610af17f61ed9a48fde43413b305c221c0e96e0416dfec96bb7d61388af0bfaf639894a760001b6115a5565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414610d2557610bc07f593e8049ff3cd5802d1a1edfa1860ed2d10095eaa97428ea365be5118fc5355260001b6115a5565b610bec7f3d21d8ca5d46f783178db6e2d9c43f1361725efb831a4c6719f7c987e8f19bba60001b6115a5565b610c187f3882be9fccd1bda569b6b9cf3ec77df60db112deaf84340f62e0645431d2df3060001b6115a5565b81600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610ca09190612342565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610d52565b610d517f18cc73bd0ddca7de4d1d26ecdb1947bffb862032515c43eab318a2b9a08afc9560001b6115a5565b5b610d7e7f4e2450a46d4e97af7b471433c39f3b233fd902f97079c6891f6b8e97cc77641360001b6115a5565b610daa7fda6c63b49301c28565119ec9affebeda959eb4655fbd84aa68f9463fcc635cff60001b6115a5565b610db584848461176f565b610de17f4d2cb7586d66a5939df44c02f86e758ca38bc6acf5b6036dde2ffd493ac2a02e60001b6115a5565b610e0d7f6f08a13a6c1dcf5da1cb012074436974e1d053c1a698f77a7af870a8835e207c60001b6115a5565b600190509392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c960001b81565b601281565b60055481565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6040518060400160405280600181526020017f310000000000000000000000000000000000000000000000000000000000000081525081565b60016020528060005260406000206000915090505481565b60066020528060005260406000206000915090505481565b60048054610ee69061210d565b80601f0160208091040260200160405190810160405280929190818152602001828054610f129061210d565b8015610f5f5780601f10610f3457610100808354040283529160200191610f5f565b820191906000526020600020905b815481529060010190602001808311610f4257829003601f168201915b505050505081565b6000610f957f6dbf7b4e8086cf403e287d31396f09607031fac8db78ceee7762170fbb213dc460001b6115a5565b610fc17f85b5bdbb6488bf782320dab96964f4183d794ec2fa3a4daafef5af97ed8d899860001b6115a5565b610fed7ff0b3d24172d70c8c5a7cbdd7a93c0696ad0ee9b236905f00f0a63e02834110b560001b6115a5565b610ff833848461176f565b6110247f7da7a637e92dabe0065667031840332628bdba20f400449c6e3d8ff896ab318a60001b6115a5565b6110507f95920a6cc4757a3bb1110a8ca7ec52426ee654bd20fdd325b452fe4b41a2084860001b6115a5565b6001905092915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6110aa7f7600fbc6ce061ad5bf40136ffce485dc2b7b859043bdb345202656d3141b8dd460001b6115a5565b6110d67f456668c7a20b0a1fe5f3ee0a34d48818935b08aee7338d54ac95598081aa6dd060001b6115a5565b6111027fa33c333b8c55442647ec618c9f72a21cf894ced095c8f7927f1270483d26440460001b6115a5565b42841015611194576111367f53abf7747aba15785df6f303b36ab6307ceb4727136f99d412e927735fdf2f2a60001b6115a5565b6111627fdba2f4da178417ba1849cc1f522e7263d1ba9ccc57bc5dd7e580a134e88e098260001b6115a5565b6040517f9436330900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6111c07fb9fadfe925549e62c022eae61485e425575bc3be7bb8c6ee6a1ed766cf8f910c60001b6115a5565b6111ec7fc0d9739e7af60c6fa5844f621889701325c3354e7bb32cbe1a1ff169c8373a5f60001b6115a5565b6112187f5882f709a53fcaa3f21379161f59124fa5453549279847612fca4ab625a3a5a660001b6115a5565b60006005547f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c960001b898989600660008e73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600081548092919061129490612376565b919050558a6040516020016112ae969594939291906123be565b604051602081830303815290604052805190602001206040516020016112d5929190612497565b6040516020818303038152906040528051906020012090506113197fac710318545779f3196017fa5d303e4d51ccf7f73ef2a8042d657ec0113c6cf360001b6115a5565b6113457fba43db088c956d4e9787ba69a78d6d93d378bec3308e4dc604c6191315d4ad1860001b6115a5565b60006001828686866040516000815260200160405260405161136a94939291906124ce565b6020604051602081039080840390855afa15801561138c573d6000803e3d6000fd5b5050506020604051035190506113c47f0df69e3c236ef0f9accdf216814cd421a62d1e49192ac8c20b92d5413123a4df60001b6115a5565b6113f07f4ef950c6656187c0bb7020ef84e5d657681551a110815833ef7efd9423e5db3160001b6115a5565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16148061145757508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b156114e6576114887f23c3e383effec2c2fa71f0be8b48604096a74c52ef47ccb5ef23b73c0000417260001b6115a5565b6114b47f5ed7fc52a70b958353ab5d3545997b036e66e81d7ee19c70a972316d4c2511d860001b6115a5565b6040517f0d1a45ee00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6115127f99d7972b689f7a3811f171ea97698df61a7c2584bd85fd326881e20295f2f29060001b6115a5565b61153e7f0481ce8d9ee8e6363512aeea932f7efb615fd9289ffbadeab3454fdb736829ae60001b6115a5565b61156a7f36fab2621bd9c33cb41b04b5532a50a8a969ae6e6e18a637d32bc78cc4b6ac4e60001b6115a5565b6115758989896115a8565b505050505050505050565b6002602052816000526040600020602052806000526040600020600091509150505481565b50565b6115d47f6d171f5d98acf3f7f0b6c902a4bcdf752eda92591e38d1b85845e02123165eea60001b6115a5565b6116007fbc80c33a621b7dd526d8a9e26f554249a8a01486d20e2c1c9f31329f36305cf360001b6115a5565b61162c7f3b911e81cbb4599b2344f7da225c936dc1950596954a2afa589643b805361eb160001b6115a5565b80600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506116d97fd6002c9644485162d9b53e43e81b9d2505beea6d1eb53069bca53cdc2212b0e660001b6115a5565b6117057fe38f016df7e1a933f1c613bd28562996566cf14ba64e457e9d537a224ea57d8d60001b6115a5565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516117629190611e74565b60405180910390a3505050565b61179b7f28965b841fb9abb0e50fcf8006e0353e5671e1cf86fcc05f2734c55258a85e7560001b6115a5565b6117c77fa0f882d7883ea811736c709fb74f6bd96eb19107b7fd041f3cb85a825bab279260001b6115a5565b6117f37f73143f933a7021377e274abf7a64430a8b70c3caeb553421bb86f59c6d29a4b360001b6115a5565b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461183e9190612342565b600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506118ad7fca6c346c6e9b9d888bb7af4cbaf4fb7d2291a0459e53eb15c00f77705d744b2760001b6115a5565b6118d97fe76a2d64e1ea80eee9191c6d8016b773cf0b1e760a201ba020252b57bf30623160001b6115a5565b80600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546119249190612513565b600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506119937f2f9fd68b21b7b9467a6445f904d4a11a7cb6322b10b253463fe581ef290bc8c860001b6115a5565b6119bf7fb53c19e9609b6beb0011cfc071808fa8065fad06501e730b5dd35a93feb669a260001b6115a5565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051611a1c9190611e74565b60405180910390a3505050565b828054611a359061210d565b90600052602060002090601f016020900481019282611a575760008555611a9e565b82601f10611a7057805160ff1916838001178555611a9e565b82800160010185558215611a9e579182015b82811115611a9d578251825591602001919060010190611a82565b5b509050611aab9190611aaf565b5090565b5b80821115611ac8576000816000905550600101611ab0565b5090565b600081519050919050565b600082825260208201905092915050565b60005b83811015611b06578082015181840152602081019050611aeb565b83811115611b15576000848401525b50505050565b6000601f19601f8301169050919050565b6000611b3782611acc565b611b418185611ad7565b9350611b51818560208601611ae8565b611b5a81611b1b565b840191505092915050565b60006020820190508181036000830152611b7f8184611b2c565b905092915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611bdd82611b1b565b810181811067ffffffffffffffff82111715611bfc57611bfb611ba5565b5b80604052505050565b6000611c0f611b87565b9050611c1b8282611bd4565b919050565b600067ffffffffffffffff821115611c3b57611c3a611ba5565b5b611c4482611b1b565b9050602081019050919050565b82818337600083830152505050565b6000611c73611c6e84611c20565b611c05565b905082815260208101848484011115611c8f57611c8e611ba0565b5b611c9a848285611c51565b509392505050565b600082601f830112611cb757611cb6611b9b565b5b8135611cc7848260208601611c60565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611cfb82611cd0565b9050919050565b611d0b81611cf0565b8114611d1657600080fd5b50565b600081359050611d2881611d02565b92915050565b600080600060608486031215611d4757611d46611b91565b5b600084013567ffffffffffffffff811115611d6557611d64611b96565b5b611d7186828701611ca2565b935050602084013567ffffffffffffffff811115611d9257611d91611b96565b5b611d9e86828701611ca2565b9250506040611daf86828701611d19565b9150509250925092565b6000819050919050565b611dcc81611db9565b8114611dd757600080fd5b50565b600081359050611de981611dc3565b92915050565b60008060408385031215611e0657611e05611b91565b5b6000611e1485828601611d19565b9250506020611e2585828601611dda565b9150509250929050565b60008115159050919050565b611e4481611e2f565b82525050565b6000602082019050611e5f6000830184611e3b565b92915050565b611e6e81611db9565b82525050565b6000602082019050611e896000830184611e65565b92915050565b600080600060608486031215611ea857611ea7611b91565b5b6000611eb686828701611d19565b9350506020611ec786828701611d19565b9250506040611ed886828701611dda565b9150509250925092565b6000819050919050565b611ef581611ee2565b82525050565b6000602082019050611f106000830184611eec565b92915050565b600060ff82169050919050565b611f2c81611f16565b82525050565b6000602082019050611f476000830184611f23565b92915050565b611f5681611cf0565b82525050565b6000602082019050611f716000830184611f4d565b92915050565b600060208284031215611f8d57611f8c611b91565b5b6000611f9b84828501611d19565b91505092915050565b611fad81611f16565b8114611fb857600080fd5b50565b600081359050611fca81611fa4565b92915050565b611fd981611ee2565b8114611fe457600080fd5b50565b600081359050611ff681611fd0565b92915050565b600080600080600080600060e0888a03121561201b5761201a611b91565b5b60006120298a828b01611d19565b975050602061203a8a828b01611d19565b965050604061204b8a828b01611dda565b955050606061205c8a828b01611dda565b945050608061206d8a828b01611fbb565b93505060a061207e8a828b01611fe7565b92505060c061208f8a828b01611fe7565b91505092959891949750929550565b600080604083850312156120b5576120b4611b91565b5b60006120c385828601611d19565b92505060206120d485828601611d19565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061212557607f821691505b602082108103612138576121376120de565b5b50919050565b600081905092915050565b60008190508160005260206000209050919050565b6000815461216b8161210d565b612175818661213e565b9450600182166000811461219057600181146121a1576121d4565b60ff198316865281860193506121d4565b6121aa85612149565b60005b838110156121cc578154818901526001820191506020810190506121ad565b838801955050505b50505092915050565b60006121e9828461215e565b915081905092915050565b600060a0820190506122096000830188611eec565b6122166020830187611eec565b6122236040830186611eec565b6122306060830185611e65565b61223d6080830184611f4d565b9695505050505050565b60008190508160005260206000209050919050565b600081546122698161210d565b6122738186611ad7565b9450600182166000811461228e57600181146122a0576122d3565b60ff19831686526020860193506122d3565b6122a985612247565b60005b838110156122cb578154818901526001820191506020810190506122ac565b808801955050505b50505092915050565b600060408201905081810360008301526122f6818561225c565b9050818103602083015261230a818461225c565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061234d82611db9565b915061235883611db9565b92508282101561236b5761236a612313565b5b828203905092915050565b600061238182611db9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036123b3576123b2612313565b5b600182019050919050565b600060c0820190506123d36000830189611eec565b6123e06020830188611f4d565b6123ed6040830187611f4d565b6123fa6060830186611e65565b6124076080830185611e65565b61241460a0830184611e65565b979650505050505050565b600081905092915050565b7f1901000000000000000000000000000000000000000000000000000000000000600082015250565b600061246060028361241f565b915061246b8261242a565b600282019050919050565b6000819050919050565b61249161248c82611ee2565b612476565b82525050565b60006124a282612453565b91506124ae8285612480565b6020820191506124be8284612480565b6020820191508190509392505050565b60006080820190506124e36000830187611eec565b6124f06020830186611f23565b6124fd6040830185611eec565b61250a6060830184611eec565b95945050505050565b600061251e82611db9565b915061252983611db9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561255e5761255d612313565b5b82820190509291505056fea164736f6c634300080d000a";

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
