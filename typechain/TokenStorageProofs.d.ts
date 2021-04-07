/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface TokenStorageProofsInterface extends ethers.utils.Interface {
  functions: {
    "getBalanceMappingPosition(address)": FunctionFragment;
    "getBalanceSlot(address,uint256)": FunctionFragment;
    "isRegistered(address)": FunctionFragment;
    "registerToken(address,uint256,bytes,bytes,bytes,uint256)": FunctionFragment;
    "tokenAddresses(uint256)": FunctionFragment;
    "tokenCount()": FunctionFragment;
    "tokens(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getBalanceMappingPosition",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceSlot",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isRegistered",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "registerToken",
    values: [
      string,
      BigNumberish,
      BytesLike,
      BytesLike,
      BytesLike,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAddresses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenCount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "tokens", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "getBalanceMappingPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceSlot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRegistered",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokens", data: BytesLike): Result;

  events: {
    "TokenRegistered(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TokenRegistered"): EventFragment;
}

export class TokenStorageProofs extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TokenStorageProofsInterface;

  functions: {
    getBalanceMappingPosition(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "getBalanceMappingPosition(address)"(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getBalanceSlot(
      holder: string,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "getBalanceSlot(address,uint256)"(
      holder: string,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isRegistered(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isRegistered(address)"(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    registerToken(
      token: string,
      blockNumber: BigNumberish,
      storageProof: BytesLike,
      blockHeaderRLP: BytesLike,
      accountStateProof: BytesLike,
      balanceMappingPosition: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "registerToken(address,uint256,bytes,bytes,bytes,uint256)"(
      token: string,
      blockNumber: BigNumberish,
      storageProof: BytesLike,
      blockHeaderRLP: BytesLike,
      accountStateProof: BytesLike,
      balanceMappingPosition: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenAddresses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "tokenAddresses(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenCount(overrides?: CallOverrides): Promise<[number]>;

    "tokenCount()"(overrides?: CallOverrides): Promise<[number]>;

    tokens(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & {
        balanceMappingPosition: BigNumber;
        registered: boolean;
      }
    >;

    "tokens(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & {
        balanceMappingPosition: BigNumber;
        registered: boolean;
      }
    >;
  };

  getBalanceMappingPosition(
    ercTokenAddress: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getBalanceMappingPosition(address)"(
    ercTokenAddress: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getBalanceSlot(
    holder: string,
    balanceMappingPosition: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getBalanceSlot(address,uint256)"(
    holder: string,
    balanceMappingPosition: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  isRegistered(
    ercTokenAddress: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isRegistered(address)"(
    ercTokenAddress: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  registerToken(
    token: string,
    blockNumber: BigNumberish,
    storageProof: BytesLike,
    blockHeaderRLP: BytesLike,
    accountStateProof: BytesLike,
    balanceMappingPosition: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "registerToken(address,uint256,bytes,bytes,bytes,uint256)"(
    token: string,
    blockNumber: BigNumberish,
    storageProof: BytesLike,
    blockHeaderRLP: BytesLike,
    accountStateProof: BytesLike,
    balanceMappingPosition: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenAddresses(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "tokenAddresses(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenCount(overrides?: CallOverrides): Promise<number>;

  "tokenCount()"(overrides?: CallOverrides): Promise<number>;

  tokens(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, boolean] & {
      balanceMappingPosition: BigNumber;
      registered: boolean;
    }
  >;

  "tokens(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, boolean] & {
      balanceMappingPosition: BigNumber;
      registered: boolean;
    }
  >;

  callStatic: {
    getBalanceMappingPosition(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getBalanceMappingPosition(address)"(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalanceSlot(
      holder: string,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getBalanceSlot(address,uint256)"(
      holder: string,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    isRegistered(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isRegistered(address)"(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    registerToken(
      token: string,
      blockNumber: BigNumberish,
      storageProof: BytesLike,
      blockHeaderRLP: BytesLike,
      accountStateProof: BytesLike,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "registerToken(address,uint256,bytes,bytes,bytes,uint256)"(
      token: string,
      blockNumber: BigNumberish,
      storageProof: BytesLike,
      blockHeaderRLP: BytesLike,
      accountStateProof: BytesLike,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenAddresses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "tokenAddresses(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenCount(overrides?: CallOverrides): Promise<number>;

    "tokenCount()"(overrides?: CallOverrides): Promise<number>;

    tokens(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & {
        balanceMappingPosition: BigNumber;
        registered: boolean;
      }
    >;

    "tokens(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean] & {
        balanceMappingPosition: BigNumber;
        registered: boolean;
      }
    >;
  };

  filters: {
    TokenRegistered(
      token: string | null,
      registrar: string | null
    ): TypedEventFilter<[string, string], { token: string; registrar: string }>;
  };

  estimateGas: {
    getBalanceMappingPosition(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getBalanceMappingPosition(address)"(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalanceSlot(
      holder: string,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getBalanceSlot(address,uint256)"(
      holder: string,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRegistered(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isRegistered(address)"(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerToken(
      token: string,
      blockNumber: BigNumberish,
      storageProof: BytesLike,
      blockHeaderRLP: BytesLike,
      accountStateProof: BytesLike,
      balanceMappingPosition: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "registerToken(address,uint256,bytes,bytes,bytes,uint256)"(
      token: string,
      blockNumber: BigNumberish,
      storageProof: BytesLike,
      blockHeaderRLP: BytesLike,
      accountStateProof: BytesLike,
      balanceMappingPosition: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenAddresses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenAddresses(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenCount(overrides?: CallOverrides): Promise<BigNumber>;

    "tokenCount()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokens(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "tokens(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getBalanceMappingPosition(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getBalanceMappingPosition(address)"(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBalanceSlot(
      holder: string,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getBalanceSlot(address,uint256)"(
      holder: string,
      balanceMappingPosition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRegistered(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isRegistered(address)"(
      ercTokenAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerToken(
      token: string,
      blockNumber: BigNumberish,
      storageProof: BytesLike,
      blockHeaderRLP: BytesLike,
      accountStateProof: BytesLike,
      balanceMappingPosition: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "registerToken(address,uint256,bytes,bytes,bytes,uint256)"(
      token: string,
      blockNumber: BigNumberish,
      storageProof: BytesLike,
      blockHeaderRLP: BytesLike,
      accountStateProof: BytesLike,
      balanceMappingPosition: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenAddresses(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenAddresses(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "tokenCount()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokens(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokens(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
