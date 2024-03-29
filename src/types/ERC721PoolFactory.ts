/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ERC721PoolFactoryInterface extends utils.Interface {
  contractName: "ERC721PoolFactory";
  functions: {
    "allPools(uint256)": FunctionFragment;
    "allPoolsLength()": FunctionFragment;
    "assetNonces(address)": FunctionFragment;
    "createPool(address)": FunctionFragment;
    "getPool(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rescueLastNFT(address,address)": FunctionFragment;
    "setENSName(address,address,string)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allPools",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allPoolsLength",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "assetNonces", values: [string]): string;
  encodeFunctionData(functionFragment: "createPool", values: [string]): string;
  encodeFunctionData(functionFragment: "getPool", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rescueLastNFT",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setENSName",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "allPools", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allPoolsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assetNonces",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rescueLastNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setENSName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "CreatePool(string,string,address,address)": EventFragment;
    "ENSNameSet(address,string)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreatePool"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ENSNameSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type CreatePoolEvent = TypedEvent<
  [string, string, string, string],
  { name: string; symbol: string; asset: string; pool: string }
>;

export type CreatePoolEventFilter = TypedEventFilter<CreatePoolEvent>;

export type ENSNameSetEvent = TypedEvent<
  [string, string],
  { poolAddress: string; name: string }
>;

export type ENSNameSetEventFilter = TypedEventFilter<ENSNameSetEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ERC721PoolFactory extends BaseContract {
  contractName: "ERC721PoolFactory";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ERC721PoolFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    allPools(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    allPoolsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    assetNonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    createPool(
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPool(arg0: string, overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rescueLastNFT(
      asset: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setENSName(
      asset: string,
      registrar: string,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  allPools(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  allPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

  assetNonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  createPool(
    asset: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPool(arg0: string, overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rescueLastNFT(
    asset: string,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setENSName(
    asset: string,
    registrar: string,
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    allPools(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    allPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

    assetNonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    createPool(asset: string, overrides?: CallOverrides): Promise<void>;

    getPool(arg0: string, overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rescueLastNFT(
      asset: string,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setENSName(
      asset: string,
      registrar: string,
      name: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CreatePool(string,string,address,address)"(
      name?: null,
      symbol?: null,
      asset?: string | null,
      pool?: string | null
    ): CreatePoolEventFilter;
    CreatePool(
      name?: null,
      symbol?: null,
      asset?: string | null,
      pool?: string | null
    ): CreatePoolEventFilter;

    "ENSNameSet(address,string)"(
      poolAddress?: null,
      name?: null
    ): ENSNameSetEventFilter;
    ENSNameSet(poolAddress?: null, name?: null): ENSNameSetEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    allPools(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    allPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

    assetNonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    createPool(
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPool(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rescueLastNFT(
      asset: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setENSName(
      asset: string,
      registrar: string,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allPools(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allPoolsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    assetNonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createPool(
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPool(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rescueLastNFT(
      asset: string,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setENSName(
      asset: string,
      registrar: string,
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
