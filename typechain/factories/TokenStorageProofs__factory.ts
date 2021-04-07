/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { TokenStorageProofs } from "../TokenStorageProofs";

export class TokenStorageProofs__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenStorageProofs> {
    return super.deploy(overrides || {}) as Promise<TokenStorageProofs>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenStorageProofs {
    return super.attach(address) as TokenStorageProofs;
  }
  connect(signer: Signer): TokenStorageProofs__factory {
    return super.connect(signer) as TokenStorageProofs__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenStorageProofs {
    return new Contract(address, _abi, signerOrProvider) as TokenStorageProofs;
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
  "0x60806040526002805463ffffffff1916905534801561001d57600080fd5b506119988061002d6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063c3c5a5471161005b578063c3c5a54714610107578063e486033914610141578063e5df8b8414610180578063f9c59762146101b95761007d565b80631820fb47146100825780632815a86a146100c05780639f181b5e146100e6575b600080fd5b6100ae6004803603604081101561009857600080fd5b506001600160a01b038135169060200135610386565b60408051918252519081900360200190f35b6100ae600480360360208110156100d657600080fd5b50356001600160a01b03166103be565b6100ee61042d565b6040805163ffffffff9092168252519081900360200190f35b61012d6004803603602081101561011d57600080fd5b50356001600160a01b0316610439565b604080519115158252519081900360200190f35b6101676004803603602081101561015757600080fd5b50356001600160a01b03166104aa565b6040805192835290151560208301528051918290030190f35b61019d6004803603602081101561019657600080fd5b50356104c6565b604080516001600160a01b039092168252519081900360200190f35b610384600480360360c08110156101cf57600080fd5b6001600160a01b03823516916020810135918101906060810160408201356401000000008111156101ff57600080fd5b82018360208201111561021157600080fd5b8035906020019184600183028401116401000000008311171561023357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929594936020810193503591505064010000000081111561028657600080fd5b82018360208201111561029857600080fd5b803590602001918460018302840111640100000000831117156102ba57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929594936020810193503591505064010000000081111561030d57600080fd5b82018360208201111561031f57600080fd5b8035906020019184600183028401116401000000008311171561034157600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050913592506104ed915050565b005b604080516001600160a01b03939093166020808501919091528382019290925280518084038201815260609093019052815191012090565b60006001600160a01b03821661040d576040805162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b604482015290519081900360640190fd5b506001600160a01b0381166000908152602081905260409020545b919050565b60025463ffffffff1681565b60006001600160a01b038216610488576040805162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b604482015290519081900360640190fd5b506001600160a01b031660009081526020819052604090206001015460ff1690565b6000602081905290815260409020805460019091015460ff1682565b600181815481106104d357fe5b6000918252602090912001546001600160a01b0316905081565b6104f68661078a565b610547576040805162461bcd60e51b815260206004820152601e60248201527f5468652061646472657373206d757374206265206120636f6e74726163740000604482015290519081900360640190fd5b61055086610439565b156105a2576040805162461bcd60e51b815260206004820152601860248201527f546f6b656e20616c726561647920726567697374657265640000000000000000604482015290519081900360640190fd5b604080516370a0823160e01b8152336004820152905187916000916001600160a01b038416916370a08231916024808301926020929190829003018186803b1580156105ed57600080fd5b505afa158015610601573d6000803e3d6000fd5b505050506040513d602081101561061757600080fd5b5051905080610662576040805162461bcd60e51b8152602060048201526012602482015271496e73756666696369656e742066756e647360701b604482015290519081900360640190fd5b6000610670898988886107ad565b9050600061068033898488610901565b9050600081116106cc576040805162461bcd60e51b8152602060048201526012602482015271496e73756666696369656e742066756e647360701b604482015290519081900360640190fd5b6001600160a01b038a166000818152602081905260408082206001808201805460ff191682179055898255805480820182558185527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60180546001600160a01b031916861790556002805463ffffffff19811663ffffffff9182169093011691909117905590519092339290917f487c37289624c10056468f1f98ebffbad01edce11374975179672e32e2543bf09190a35050505050505050505050565b6000806001600160a01b0383166107a5576000915050610428565b50503b151590565b60408051808201909152601781527f424c4f434b484153485f4e4f545f415641494c41424c450000000000000000006020820152600090844090816108705760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561083557818101518382015260200161081d565b50505050905090810190601f1680156108625780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50604080516bffffffffffffffffffffffff19606089901b16602080830191909152825180830360140181526034909201909252805191012060006108b586846109e0565b905060606108c4868385610aee565b90506108f46108da6108d5836110df565b611124565b805160029081106108e757fe5b602002602001015161123a565b9998505050505050505050565b60408051808201909152601881527f554e50524f4345535345445f53544f524147455f524f4f5400000000000000006020820152600090836109845760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561083557818101518382015260200161081d565b5060006109918684610386565b604080516020808201849052825180830382018152918301909252805191012090915060606109c1878784610aee565b90506109d46109cf826110df565b61123a565b98975050505050505050565b6000607b8351116040518060400160405280601481526020017324a72b20a624a22fa12627a1a5afa422a0a222a960611b81525090610a605760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561083557818101518382015260200161081d565b50818380519060200120146040518060400160405280601481526020017324a72b20a624a22fa12627a1a5afa422a0a222a960611b81525090610ae45760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561083557818101518382015260200161081d565b505050607b015190565b604080516020808252818301909252606091829190602082018180368337019050509050826020820152610b23816000611268565b90506060610b336108d5876110df565b9050606060006060610b436118a4565b6000855160001415610bd3577f56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b4218a14610bb5576040805162461bcd60e51b815260206004820152600f60248201526e2130b21032b6b83a3c90383937b7b360891b604482015290519081900360640190fd5b505060408051600081526020810190915295506110d8945050505050565b60005b86518110156110cf57610bfb878281518110610bee57fe5b60200260200101516113a7565b955080158015610c115750855160208701208b14155b15610c5a576040805162461bcd60e51b815260206004820152601460248201527318985908199a5c9cdd081c1c9bdbd9881c185c9d60621b604482015290519081900360640190fd5b8015801590610c715750610c6d86611415565b8514155b15610cae576040805162461bcd60e51b81526020600482015260086024820152670c4c2c840d0c2e6d60c31b604482015290519081900360640190fd5b610cca878281518110610cbd57fe5b6020026020010151611124565b9350835160021415610eec5760006060610cff610cfa87600081518110610ced57fe5b60200260200101516114c9565b61154b565b90925090506000610d11858c84611659565b905080850194508151811015610da65760018a5103841015610d645760405162461bcd60e51b81526004018080602001828103825260268152602001806118bf6026913960400191505060405180910390fd5b6000805b506040519080825280601f01601f191660200182016040528015610d93576020820181803683370190505b509b5050505050505050505050506110d8565b8215610e485760018a5103841015610e05576040805162461bcd60e51b815260206004820152601c60248201527f6c656166206d75737420636f6d65206c61737420696e2070726f6f6600000000604482015290519081900360640190fd5b8a51851015610e1657600080610d68565b86600181518110610e2357fe5b60200260200101519550610e36866114c9565b9b5050505050505050505050506110d8565b60018a5103841415610e8b5760405162461bcd60e51b815260040180806020018281038252602681526020018061193d6026913960400191505060405180910390fd5b610ea887600181518110610e9b57fe5b60200260200101516116ce565b610eca57610ebc87600181518110610ced57fe5b805190602001209750610ee4565b610eda87600181518110610bee57fe5b8051906020012097505b5050506110c7565b8351601114156110c75787518214611050576000888381518110610f0c57fe5b01602001516001939093019260f81c905060108110610f5c5760405162461bcd60e51b815260040180806020018281038252602e8152602001806118e5602e913960400191505060405180910390fd5b610f7b858260ff1681518110610f6e57fe5b60200260200101516116fa565b15610ff85760018851038214610fd8576040805162461bcd60e51b815260206004820152601d60248201527f6c656166206e6f646573206f6e6c79206174206c617374206c6576656c000000604482015290519081900360640190fd5b505060408051600081526020810190915297506110d89650505050505050565b61100a858260ff1681518110610e9b57fe5b61102e57611020858260ff1681518110610ced57fe5b80519060200120955061104a565b611040858260ff1681518110610bee57fe5b8051906020012095505b506110c7565b600187510381146110a8576040805162461bcd60e51b815260206004820152601760248201527f73686f756c64206265206174206c617374206c6576656c000000000000000000604482015290519081900360640190fd5b6110b884601081518110610ced57fe5b985050505050505050506110d8565b600101610bd6565b50505050505050505b9392505050565b6110e76118a4565b815161110757506040805180820190915260008082526020820152610428565b506040805180820190915281518152602082810190820152919050565b606061112f826116ce565b61116a5760405162461bcd60e51b815260040180806020018281038252602a815260200180611913602a913960400191505060405180910390fd5b60006111758361171d565b90508067ffffffffffffffff8111801561118e57600080fd5b506040519080825280602002602001820160405280156111c857816020015b6111b56118a4565b8152602001906001900390816111ad5790505b50915060006111da846020015161176a565b60208501510190506000805b83811015611231576111f7836117d3565b915060405180604001604052808381526020018481525085828151811061121a57fe5b6020908102919091010152918101916001016111e6565b50505050919050565b60008061124a836020015161176a565b83516020948501518201519190039093036101000a90920492915050565b6060600083511161127857600080fd5b82516002028083111561128a57600080fd5b8290038067ffffffffffffffff811180156112a457600080fd5b506040519080825280601f01601f1916602001820160405280156112cf576020820181803683370190505b5091506000835b828501811015611394576002810661133a5760048660028304815181106112f957fe5b602001015160f81c60f81b60f81c60ff16901c600f1660f81b84838151811061131e57fe5b60200101906001600160f81b031916908160001a905350611388565b600086600283048151811061134b57fe5b602001015160f81c60f81b60f81c60ff16901c600f1660f81b84838151811061137057fe5b60200101906001600160f81b031916908160001a9053505b600191820191016112d6565b508251811461139f57fe5b505092915050565b606080826000015167ffffffffffffffff811180156113c557600080fd5b506040519080825280601f01601f1916602001820160405280156113f0576020820181803683370190505b509050600081602001905061140e8460200151828660000151611863565b5092915050565b600060208251101561142e575080516020820120610428565b816040516020018082805190602001908083835b602083106114615780518252601f199092019160209182019101611442565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040528051906020012060405160200180828152602001915050604051602081830303815290604052805190602001209050610428565b606060006114da836020015161176a565b835190915081900360608167ffffffffffffffff811180156114fb57600080fd5b506040519080825280601f01601f191660200182016040528015611526576020820181803683370190505b5090506000816020019050611542848760200151018285611863565b50949350505050565b60006060600083511161158d576040805162461bcd60e51b8152602060048201526005602482015264456d70747960d81b604482015290519081900360640190fd5b600060048460008151811061159e57fe5b60209101015160f81c901c600f1690506000816115c15750600092506002611643565b81600114156115d65750600092506001611643565b81600214156115eb5750600192506002611643565b81600314156115ff57506001925082611643565b6040805162461bcd60e51b81526020600482015260146024820152736661696c6564206465636f64696e67205472696560601b604482015290519081900360640190fd5b8361164e8683611268565b935093505050915091565b6000805b835185820110801561166f5750825181105b156116c65782818151811061168057fe5b602001015160f81c60f81b6001600160f81b03191684868301815181106116a357fe5b01602001516001600160f81b031916146116be5790506110d8565b60010161165d565b949350505050565b6020810151805160009190821a9060c08210156116f057600092505050610428565b5060019392505050565b805160009060011461170e57506000610428565b50602001515160001a60801490565b600080600090506000611733846020015161176a565b602085015185519181019250015b8082101561176157611752826117d3565b60019093019290910190611741565b50909392505050565b8051600090811a6080811015611784576000915050610428565b60b881108061179f575060c0811080159061179f575060f881105b156117ae576001915050610428565b60c08110156117c25760b519019050610428565b60f519019050610428565b50919050565b8051600090811a60808110156117ed576001915050610428565b60b881101561180157607e19019050610428565b60c081101561182e5760b78103600184019350806020036101000a845104600182018101935050506117cd565b60f88110156118425760be19019050610428565b60019290920151602083900360f7016101000a900490910160f51901919050565b5b60208110611883578251825260209283019290910190601f1901611864565b915181516020939093036101000a6000190180199091169216919091179052565b60405180604001604052806000815260200160008152509056fe646976657267656e74206e6f6465206d75737420636f6d65206c61737420696e2070726f6f666966206272616e6368206e6f6465206561636820656c656d656e742068617320746f2062652061206e6962626c6543616e6e6f7420636f6e7665727420746f206c6973742061206e6f6e2d6c69737420524c504974656d2e657874656e73696f6e206e6f64652063616e6e6f74206265206174206c617374206c6576656ca264697066735822122020bb42f70f482f3cb6807ab4bf4103f8d836f6d4464c52cf3dbe0f5f759f95ba64736f6c63430007030033";