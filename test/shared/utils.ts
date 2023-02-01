import { utils } from "ethers";

const { getAddress, keccak256, solidityPack } = utils;

export function getCreate2Address(factoryAddress: string, asset: string, bytecode: string): string {
  const create2Inputs = ["0xff", factoryAddress, keccak256(solidityPack(["address"], [asset])), keccak256(bytecode)];
  const sanitizedInputs = `0x${create2Inputs.map(i => i.slice(2)).join("")}`;
  return getAddress(`0x${keccak256(sanitizedInputs).slice(-40)}`);
}
