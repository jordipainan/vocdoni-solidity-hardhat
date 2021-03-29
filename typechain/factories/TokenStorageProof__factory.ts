/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { TokenStorageProof } from "../TokenStorageProof";

export class TokenStorageProof__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenStorageProof> {
    return super.deploy(overrides || {}) as Promise<TokenStorageProof>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenStorageProof {
    return super.attach(address) as TokenStorageProof;
  }
  connect(signer: Signer): TokenStorageProof__factory {
    return super.connect(signer) as TokenStorageProof__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenStorageProof {
    return new Contract(address, _abi, signerOrProvider) as TokenStorageProof;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "registrar",
        type: "address",
      },
    ],
    name: "TokenRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ercTokenAddress",
        type: "address",
      },
    ],
    name: "getBalanceMappingPosition",
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
        name: "holder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balanceMappingPosition",
        type: "uint256",
      },
    ],
    name: "getBalanceSlot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ercTokenAddress",
        type: "address",
      },
    ],
    name: "isRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "storageProof",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "blockHeaderRLP",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "accountStateProof",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "balanceMappingPosition",
        type: "uint256",
      },
    ],
    name: "registerToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenAddresses",
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
    name: "tokenCount",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokens",
    outputs: [
      {
        internalType: "uint256",
        name: "balanceMappingPosition",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "registered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000600260006101000a81548163ffffffff021916908363ffffffff16021790555034801561003257600080fd5b506123f2806100426000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063c3c5a5471161005b578063c3c5a54714610160578063e4860339146101ba578063e5df8b841461021b578063f9c59762146102735761007d565b80631820fb47146100825780632815a86a146100e45780639f181b5e1461013c575b600080fd5b6100ce6004803603604081101561009857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610490565b6040518082815260200191505060405180910390f35b610126600480360360208110156100fa57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104e2565b6040518082815260200191505060405180910390f35b6101446105cf565b604051808263ffffffff16815260200191505060405180910390f35b6101a26004803603602081101561017657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105e5565b60405180821515815260200191505060405180910390f35b6101fc600480360360208110156101d057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106df565b6040518083815260200182151581526020019250505060405180910390f35b6102476004803603602081101561023157600080fd5b8101908080359060200190929190505050610710565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61048e600480360360c081101561028957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001906401000000008111156102d057600080fd5b8201836020820111156102e257600080fd5b8035906020019184600183028401116401000000008311171561030457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561036757600080fd5b82018360208201111561037957600080fd5b8035906020019184600183028401116401000000008311171561039b57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156103fe57600080fd5b82018360208201111561041057600080fd5b8035906020019184600183028401116401000000008311171561043257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919050505061074c565b005b60008273ffffffffffffffffffffffffffffffffffffffff1660001b82604051602001808381526020018281526020019250505060405160208183030381529060405280519060200120905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610586576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f496e76616c69642061646472657373000000000000000000000000000000000081525060200191505060405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050919050565b600260009054906101000a900463ffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610689576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f496e76616c69642061646472657373000000000000000000000000000000000081525060200191505060405180910390fd5b6000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff169050919050565b60006020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16905082565b6001818154811061071d57fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61075586610b62565b6107c7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f5468652061646472657373206d757374206265206120636f6e7472616374000081525060200191505060405180910390fd5b6107d0866105e5565b15610843576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260188152602001807f546f6b656e20616c72656164792072656769737465726564000000000000000081525060200191505060405180910390fd5b600086905060008173ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060206040518083038186803b1580156108b157600080fd5b505afa1580156108c5573d6000803e3d6000fd5b505050506040513d60208110156108db57600080fd5b8101908080519060200190929190505050905060008111610964576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f496e73756666696369656e742066756e6473000000000000000000000000000081525060200191505060405180910390fd5b600061097289898888610bb5565b9050600061098233898488610d4c565b9050600081116109fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f496e73756666696369656e742066756e6473000000000000000000000000000081525060200191505060405180910390fd5b60008060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018160010160006101000a81548160ff02191690831515021790555085816000018190555060018b9080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600260009054906101000a900463ffffffff1601600260006101000a81548163ffffffff021916908363ffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff167f487c37289624c10056468f1f98ebffbad01edce11374975179672e32e2543bf060405160405180910390a35050505050505050505050565b600080600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610ba4576000915050610bb0565b823b9050600081119150505b919050565b600080844090506000801b8114156040518060400160405280601781526020017f424c4f434b484153485f4e4f545f415641494c41424c4500000000000000000081525090610c9f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610c64578082015181840152602081019050610c49565b50505050905090810190601f168015610c915780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600086604051602001808273ffffffffffffffffffffffffffffffffffffffff1660601b81526014019150506040516020818303038152906040528051906020012090506000610cf08684610e98565b90506060610d098284886110709092919063ffffffff16565b9050610d3b610d1f610d1a83611924565b61197b565b600260ff1681518110610d2e57fe5b6020026020010151611ab5565b60001b945050505050949350505050565b60008060001b8314156040518060400160405280601881526020017f554e50524f4345535345445f53544f524147455f524f4f54000000000000000081525090610e31576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610df6578082015181840152602081019050610ddb565b50505050905090810190601f168015610e235780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000610e3e8684610490565b9050600081604051602001808281526020019150506040516020818303038152906040528051906020012090506060610e78878784611070565b9050610e8b610e8682611924565b611ab5565b9350505050949350505050565b6000607b8351116040518060400160405280601481526020017f494e56414c49445f424c4f434b5f48454144455200000000000000000000000081525090610f7b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f40578082015181840152602081019050610f25565b50505050905090810190601f168015610f6d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50818380519060200120146040518060400160405280601481526020017f494e56414c49445f424c4f434b5f48454144455200000000000000000000000081525090611062576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561102757808201518184015260208101905061100c565b50505050905090810190601f1680156110545780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50607b830151905092915050565b606080602067ffffffffffffffff8111801561108b57600080fd5b506040519080825280601f01601f1916602001820160405280156110be5781602001600182028036833780820191505090505b5090508260208201526110d2816000611af8565b905060606110e76110e287611924565b61197b565b90506060600060606110f76122fe565b600080865114156111f4577f56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b42160001b8a1461119a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600f8152602001807f42616420656d7074792070726f6f66000000000000000000000000000000000081525060200191505060405180910390fd5b600067ffffffffffffffff811180156111b257600080fd5b506040519080825280601f01601f1916602001820160405280156111e55781602001600182028036833780820191505090505b5097505050505050505061191d565b60005b86518110156119145761121c87828151811061120f57fe5b6020026020010151611c96565b9550600081148015611235575085805190602001208b14155b156112a8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f6261642066697273742070726f6f66207061727400000000000000000000000081525060200191505060405180910390fd5b600081141580156112c157506112bd86611d0f565b8514155b15611334576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260088152602001807f626164206861736800000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b61135087828151811061134357fe5b602002602001015161197b565b935060028451141561165657600060606113856113808760008151811061137357fe5b6020026020010151611dca565b611e5c565b8092508193505050600061139a858c84611fe3565b9050808501945081518110156114655760018a5103841015611407576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806123196026913960400191505060405180910390fd5b600067ffffffffffffffff8111801561141f57600080fd5b506040519080825280601f01601f1916602001820160405280156114525781602001600182028036833780820191505090505b509b50505050505050505050505061191d565b821561157e5760018a51038410156114e5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f6c656166206d75737420636f6d65206c61737420696e2070726f6f660000000081525060200191505060405180910390fd5b8a5185101561154c57600067ffffffffffffffff8111801561150657600080fd5b506040519080825280601f01601f1916602001820160405280156115395781602001600182028036833780820191505090505b509b50505050505050505050505061191d565b8660018151811061155957fe5b6020026020010151955061156c86611dca565b9b50505050505050505050505061191d565b60018a51038414156115db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806123976026913960400191505060405180910390fd5b6115f8876001815181106115eb57fe5b602002602001015161209d565b611627576116198760018151811061160c57fe5b6020026020010151611dca565b80519060200120975061164e565b6116448760018151811061163757fe5b6020026020010151611c96565b8051906020012097505b505050611907565b601184511415611906578751821461186057600088838151811061167657fe5b602001015160f81c60f81b60f81c905060018301925060108160ff16106116e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e81526020018061233f602e913960400191505060405180910390fd5b611707858260ff16815181106116fa57fe5b60200260200101516120d6565b156117e15760018851038214611785576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f6c656166206e6f646573206f6e6c79206174206c617374206c6576656c00000081525060200191505060405180910390fd5b600067ffffffffffffffff8111801561179d57600080fd5b506040519080825280601f01601f1916602001820160405280156117d05781602001600182028036833780820191505090505b50995050505050505050505061191d565b611800858260ff16815181106117f357fe5b602002602001015161209d565b61183157611823858260ff168151811061181657fe5b6020026020010151611dca565b80519060200120955061185a565b611850858260ff168151811061184357fe5b6020026020010151611c96565b8051906020012095505b50611905565b600187510381146118d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260178152602001807f73686f756c64206265206174206c617374206c6576656c00000000000000000081525060200191505060405180910390fd5b6118f6846010815181106118e957fe5b6020026020010151611dca565b9850505050505050505061191d565b5b5b80806001019150506111f7565b50505050505050505b9392505050565b61192c6122fe565b6000825114156119545760405180604001604052806000815260200160008152509050611976565b6000602083019050604051806040016040528084518152602001828152509150505b919050565b60606119868261209d565b6119db576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a81526020018061236d602a913960400191505060405180910390fd5b60006119e68361210f565b90508067ffffffffffffffff811180156119ff57600080fd5b50604051908082528060200260200182016040528015611a3957816020015b611a266122fe565b815260200190600190039081611a1e5790505b5091506000611a4b846020015161216a565b8460200151019050600080600090505b83811015611aac57611a6c836121f3565b9150604051806040016040528083815260200184815250858281518110611a8f57fe5b602002602001018190525081830192508080600101915050611a5b565b50505050919050565b600080611ac5836020015161216a565b9050600081846000015103905060008285602001510190506000826020036101000a825104905080945050505050919050565b60606000835111611b0857600080fd5b60006002845102905080831115611b1e57600080fd5b82810390508067ffffffffffffffff81118015611b3a57600080fd5b506040519080825280601f01601f191660200182016040528015611b6d5781602001600182028036833780820191505090505b5091506000808490505b828501811015611c8357600060028281611b8d57fe5b061415611c0557600f60048760028481611ba357fe5b0481518110611bae57fe5b602001015160f81c60f81b60f81c60ff16901c1660f81b848381518110611bd157fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611c72565b600f60008760028481611c1457fe5b0481518110611c1f57fe5b602001015160f81c60f81b60f81c60ff16901c1660f81b848381518110611c4257fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b600182019150600181019050611b77565b5082518114611c8e57fe5b505092915050565b606080826000015167ffffffffffffffff81118015611cb457600080fd5b506040519080825280601f01601f191660200182016040528015611ce75781602001600182028036833780820191505090505b5090506000816020019050611d0584602001518286600001516122a6565b8192505050919050565b6000602082511015611d2a5781805190602001209050611dc5565b816040516020018082805190602001908083835b60208310611d615780518252602082019150602081019050602083039250611d3e565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405160208183030381529060405280519060200120604051602001808281526020019150506040516020818303038152906040528051906020012090505b919050565b60606000611ddb836020015161216a565b9050600081846000015103905060608167ffffffffffffffff81118015611e0157600080fd5b506040519080825280601f01601f191660200182016040528015611e345781602001600182028036833780820191505090505b5090506000816020019050611e508487602001510182856122a6565b81945050505050919050565b600060606000835111611ed7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260058152602001807f456d70747900000000000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b6000600f600485600081518110611eea57fe5b602001015160f81c60f81b60f81c60ff16901c1660ff169050600080821415611f1a576002905060009350611fcd565b6001821415611f30576001905060009350611fcc565b6002821415611f46576002905060019350611fcb565b6003821415611f5c576001905060019350611fca565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f6661696c6564206465636f64696e67205472696500000000000000000000000081525060200191505060405180910390fd5b5b5b5b83611fd88683611af8565b935093505050915091565b600080600090505b8351858201108015611ffd5750825181105b156120915782818151811061200e57fe5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916848683018151811061204957fe5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146120845780915050612096565b8080600101915050611feb565b809150505b9392505050565b600080600083602001519050805160001a915060c060ff168260ff1610156120ca576000925050506120d1565b6001925050505b919050565b600060018260000151146120ed576000905061210a565b60008083602001519050805160001a915060808260ff1614925050505b919050565b600080600090506000612125846020015161216a565b84602001510190506000846000015185602001510190505b8082101561215f5761214e826121f3565b82019150828060010193505061213d565b829350505050919050565b600080825160001a9050608060ff1681101561218a5760009150506121ee565b60b860ff168110806121af575060c060ff1681101580156121ae575060f860ff1681105b5b156121be5760019150506121ee565b60c060ff168110156121de5760018060b80360ff168203019150506121ee565b60018060f80360ff168203019150505b919050565b600080825160001a9050608060ff168110156122135760019150506122a1565b60b860ff16811015612231576001608060ff168203019150506122a1565b60c060ff168110156122615760b78103600184019350806020036101000a8451046001820181019350505061229f565b60f860ff1681101561227f57600160c060ff168203019150506122a1565b60f78103600184019350806020036101000a845104600182018101935050505b505b919050565b5b602060ff1681106122d65782518252602060ff1683019250602060ff1682019150602060ff16810390506122a7565b6000600182602060ff16036101000a0390508019845116818451168181178552505050505050565b60405180604001604052806000815260200160008152509056fe646976657267656e74206e6f6465206d75737420636f6d65206c61737420696e2070726f6f666966206272616e6368206e6f6465206561636820656c656d656e742068617320746f2062652061206e6962626c6543616e6e6f7420636f6e7665727420746f206c6973742061206e6f6e2d6c69737420524c504974656d2e657874656e73696f6e206e6f64652063616e6e6f74206265206174206c617374206c6576656ca2646970667358221220f74fee0168443a53aa6f802ffa31d8fecf5e398e5c29c421c092de6f61b0127d64736f6c63430007030033";