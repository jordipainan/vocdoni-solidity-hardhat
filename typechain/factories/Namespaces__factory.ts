/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Namespaces } from "../Namespaces";

export class Namespaces__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Namespaces> {
    return super.deploy(overrides || {}) as Promise<Namespaces>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Namespaces {
    return super.attach(address) as Namespaces;
  }
  connect(signer: Signer): Namespaces__factory {
    return super.connect(signer) as Namespaces__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Namespaces {
    return new Contract(address, _abi, signerOrProvider) as Namespaces;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "namespace",
        type: "uint32",
      },
    ],
    name: "NamespaceRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "namespaceCount",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "namespaces",
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
        internalType: "uint32",
        name: "namespaceId",
        type: "uint32",
      },
    ],
    name: "processContractAt",
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
    name: "register",
    outputs: [
      {
        internalType: "uint32",
        name: "result",
        type: "uint32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610200806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80631aa3a008146100515780636d3005ae1461006f578063b40ec02b1461008f578063f631514c14610097575b600080fd5b6100596100aa565b60405161006691906101b9565b60405180910390f35b61008261007d36600461017a565b610132565b60405161006691906101a5565b610059610153565b6100826100a536600461017a565b61015f565b6001805463ffffffff19811663ffffffff918216830182161780835581166000908152602081905260408082208054336001600160a01b03199091161790559254925190927f6342a3b1a0f483c8ec694afd510f5f330e4792137228eb79e3e14458f78c57469261011d929116906101b9565b60405180910390a15060015463ffffffff1690565b63ffffffff166000908152602081905260409020546001600160a01b031690565b60015463ffffffff1681565b6000602081905290815260409020546001600160a01b031681565b60006020828403121561018b578081fd5b813563ffffffff8116811461019e578182fd5b9392505050565b6001600160a01b0391909116815260200190565b63ffffffff9190911681526020019056fea2646970667358221220990cf542638edddba42cc809a604fec875f7202c664eb2db31c5d14ef2ad2e6964736f6c63430007030033";
