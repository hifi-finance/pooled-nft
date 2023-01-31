/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
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

export interface VaultFactoryInterface extends utils.Interface {
  contractName: "VaultFactory";
  functions: {
    "createVault(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "createVault", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "createVault",
    data: BytesLike
  ): Result;

  events: {
    "CreateVault(string,string,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreateVault"): EventFragment;
}

export type CreateVaultEvent = TypedEvent<
  [string, string, string, string],
  { name: string; symbol: string; asset: string; vault: string }
>;

export type CreateVaultEventFilter = TypedEventFilter<CreateVaultEvent>;

export interface VaultFactory extends BaseContract {
  contractName: "VaultFactory";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VaultFactoryInterface;

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
    createVault(
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createVault(
    asset: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createVault(asset: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "CreateVault(string,string,address,address)"(
      name?: null,
      symbol?: null,
      asset?: string | null,
      vault?: string | null
    ): CreateVaultEventFilter;
    CreateVault(
      name?: null,
      symbol?: null,
      asset?: string | null,
      vault?: string | null
    ): CreateVaultEventFilter;
  };

  estimateGas: {
    createVault(
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createVault(
      asset: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
