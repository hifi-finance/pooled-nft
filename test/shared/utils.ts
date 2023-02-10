import { Web3Provider } from "@ethersproject/providers";
import { BigNumber, Contract, utils } from "ethers";
import hre from "hardhat";
import { Artifact } from "hardhat/types";

const { getAddress, keccak256, solidityPack } = utils;

export function getCreate2Address(factoryAddress: string, asset: string, bytecode: string): string {
  const create2Inputs = ["0xff", factoryAddress, keccak256(solidityPack(["address"], [asset])), keccak256(bytecode)];
  const sanitizedInputs = `0x${create2Inputs.map(i => i.slice(2)).join("")}`;
  return getAddress(`0x${keccak256(sanitizedInputs).slice(-40)}`);
}

export function getCreate2AddressERC1155(
  factoryAddress: string,
  asset: string,
  assetId: string,
  bytecode: string,
): string {
  const create2Inputs = [
    "0xff",
    factoryAddress,
    keccak256(solidityPack(["address", "uint256"], [asset, assetId])),
    keccak256(bytecode),
  ];
  const sanitizedInputs = `0x${create2Inputs.map(i => i.slice(2)).join("")}`;
  return getAddress(`0x${keccak256(sanitizedInputs).slice(-40)}`);
}

export async function signERC2612Permit({
  provider,
  verifyingContract,
  ownerAddress,
  spenderAddress,
  amount,
  deadline,
}: {
  provider: Web3Provider;
  verifyingContract: string;
  ownerAddress: string;
  spenderAddress: string;
  amount: string;
  deadline: string;
}) {
  const erc20WnftArtifact: Artifact = await hre.artifacts.readArtifact("contracts/ERC-721/ERC20Wnft.sol:ERC20Wnft");
  let contract = new Contract(verifyingContract, erc20WnftArtifact.abi, provider);
  let name = await contract.name();
  let version = await contract.version();
  let nonce = await contract.nonces(ownerAddress);
  let { chainId } = await provider.getNetwork();

  let domain = {
    name: name,
    version: version,
    chainId: utils.hexZeroPad(BigNumber.from(chainId).toHexString(), 32),
    verifyingContract: verifyingContract,
  };
  let types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };
  let value = {
    owner: ownerAddress,
    spender: spenderAddress,
    value: amount,
    nonce: nonce,
    deadline: deadline,
  };

  const populated = await utils._TypedDataEncoder.resolveNames(domain, types, value, name => {
    return provider.resolveName(name) as Promise<string>;
  });

  let payload = utils._TypedDataEncoder.getPayload(populated.domain, types, populated.value);

  payload.types.EIP712Domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
  ];

  let signature = await provider.send("eth_signTypedData_v4", [ownerAddress.toLowerCase(), JSON.stringify(payload)]);

  return signature;
}
