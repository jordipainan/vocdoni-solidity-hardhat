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
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
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
    ],
    name: "testVerify",
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
  "0x60806040526002805463ffffffff1916905534801561001d57600080fd5b50611cca8061002d6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063c3c5a5471161005b578063c3c5a547146102dc578063e486033914610316578063e5df8b8414610355578063f9c597621461038e57610088565b80631820fb471461008d5780632815a86a146100cb578063329f4121146100f15780639f181b5e146102bb575b600080fd5b6100b9600480360360408110156100a357600080fd5b506001600160a01b038135169060200135610555565b60408051918252519081900360200190f35b6100b9600480360360208110156100e157600080fd5b50356001600160a01b031661058d565b6100b9600480360360c081101561010757600080fd5b6001600160a01b038235169160208101359160408201359190810190608081016060820135600160201b81111561013d57600080fd5b82018360208201111561014f57600080fd5b803590602001918460018302840111600160201b8311171561017057600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156101c257600080fd5b8201836020820111156101d457600080fd5b803590602001918460018302840111600160201b831117156101f557600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561024757600080fd5b82018360208201111561025957600080fd5b803590602001918460018302840111600160201b8311171561027a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610669945050505050565b6102c36106c9565b6040805163ffffffff9092168252519081900360200190f35b610302600480360360208110156102f257600080fd5b50356001600160a01b03166106d5565b604080519115158252519081900360200190f35b61033c6004803603602081101561032c57600080fd5b50356001600160a01b0316610776565b6040805192835290151560208301528051918290030190f35b6103726004803603602081101561036b57600080fd5b5035610792565b604080516001600160a01b039092168252519081900360200190f35b610553600480360360c08110156103a457600080fd5b6001600160a01b0382351691602081013591810190606081016040820135600160201b8111156103d357600080fd5b8201836020820111156103e557600080fd5b803590602001918460018302840111600160201b8311171561040657600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561045857600080fd5b82018360208201111561046a57600080fd5b803590602001918460018302840111600160201b8311171561048b57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156104dd57600080fd5b8201836020820111156104ef57600080fd5b803590602001918460018302840111600160201b8311171561051057600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955050913592506107b9915050565b005b604080516001600160a01b03939093166020808501919091528382019290925280518084038201815260609093019052815191012090565b60408051808201909152600f81526e494e56414c49445f4144445245535360881b60208201526000906001600160a01b0383166106485760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561060d5781810151838201526020016105f5565b50505050905090810190601f16801561063a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50506001600160a01b0381166000908152602081905260409020545b919050565b60408051602080820187905282518083038201815291830190925280519101206000908161069989898787610afe565b905060606106a8878385610c15565b90506106bb6106b682611206565b61124b565b9a9950505050505050505050565b60025463ffffffff1681565b60408051808201909152600f81526e494e56414c49445f4144445245535360881b60208201526000906001600160a01b0383166107535760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b50506001600160a01b031660009081526020819052604090206001015460ff1690565b6000602081905290815260409020805460019091015460ff1682565b6001818154811061079f57fe5b6000918252602090912001546001600160a01b0316905081565b6107c286611279565b6040518060400160405280600e81526020016d1393d517d057d0d3d395149050d560921b815250906108355760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b5061083f866106d5565b15604051806040016040528060128152602001711053149150511657d49151d254d51154915160721b815250906108b75760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b50604080516370a0823160e01b8152336004820152905187916000916001600160a01b038416916370a08231916024808301926020929190829003018186803b15801561090357600080fd5b505afa158015610917573d6000803e3d6000fd5b505050506040513d602081101561092d57600080fd5b505160408051808201909152601081526f4e4f545f454e4f5547485f46554e445360801b6020820152909150816109a55760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b5060006109b489898888610afe565b905060006109c43389848861129c565b9050600081116040518060400160405280601081526020016f4e4f545f454e4f5547485f46554e445360801b81525090610a3f5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b506001600160a01b038a166000818152602081905260408082206001808201805460ff191682179055898255805480820182558185527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf60180546001600160a01b031916861790556002805463ffffffff19811663ffffffff9182169093011691909117905590519092339290917f487c37289624c10056468f1f98ebffbad01edce11374975179672e32e2543bf09190a35050505050505050505050565b60408051808201909152601781527f424c4f434b484153485f4e4f545f415641494c41424c45000000000000000000602082015260009084409081610b845760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b50604080516bffffffffffffffffffffffff19606089901b1660208083019190915282518083036014018152603490920190925280519101206000610bc98684611376565b90506060610bd8868385610c15565b9050610c08610bee610be983611206565b611484565b80516002908110610bfb57fe5b602002602001015161124b565b9998505050505050505050565b604080516020808252818301909252606091829190602082018180368337019050509050826020820152610c4a81600061159a565b90506060610c5a610be987611206565b9050606060006060610c6a611bd6565b6000855160001415610cfa577f56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b4218a14610cdc576040805162461bcd60e51b815260206004820152600f60248201526e2130b21032b6b83a3c90383937b7b360891b604482015290519081900360640190fd5b505060408051600081526020810190915295506111ff945050505050565b60005b86518110156111f657610d22878281518110610d1557fe5b60200260200101516116d9565b955080158015610d385750855160208701208b14155b15610d81576040805162461bcd60e51b815260206004820152601460248201527318985908199a5c9cdd081c1c9bdbd9881c185c9d60621b604482015290519081900360640190fd5b8015801590610d985750610d9486611747565b8514155b15610dd5576040805162461bcd60e51b81526020600482015260086024820152670c4c2c840d0c2e6d60c31b604482015290519081900360640190fd5b610df1878281518110610de457fe5b6020026020010151611484565b93508351600214156110135760006060610e26610e2187600081518110610e1457fe5b60200260200101516117fb565b61187d565b90925090506000610e38858c8461198b565b905080850194508151811015610ecd5760018a5103841015610e8b5760405162461bcd60e51b8152600401808060200182810382526026815260200180611bf16026913960400191505060405180910390fd5b6000805b506040519080825280601f01601f191660200182016040528015610eba576020820181803683370190505b509b5050505050505050505050506111ff565b8215610f6f5760018a5103841015610f2c576040805162461bcd60e51b815260206004820152601c60248201527f6c656166206d75737420636f6d65206c61737420696e2070726f6f6600000000604482015290519081900360640190fd5b8a51851015610f3d57600080610e8f565b86600181518110610f4a57fe5b60200260200101519550610f5d866117fb565b9b5050505050505050505050506111ff565b60018a5103841415610fb25760405162461bcd60e51b8152600401808060200182810382526026815260200180611c6f6026913960400191505060405180910390fd5b610fcf87600181518110610fc257fe5b6020026020010151611a00565b610ff157610fe387600181518110610e1457fe5b80519060200120975061100b565b61100187600181518110610d1557fe5b8051906020012097505b5050506111ee565b8351601114156111ee578751821461117757600088838151811061103357fe5b01602001516001939093019260f81c9050601081106110835760405162461bcd60e51b815260040180806020018281038252602e815260200180611c17602e913960400191505060405180910390fd5b6110a2858260ff168151811061109557fe5b6020026020010151611a2c565b1561111f57600188510382146110ff576040805162461bcd60e51b815260206004820152601d60248201527f6c656166206e6f646573206f6e6c79206174206c617374206c6576656c000000604482015290519081900360640190fd5b505060408051600081526020810190915297506111ff9650505050505050565b611131858260ff1681518110610fc257fe5b61115557611147858260ff1681518110610e1457fe5b805190602001209550611171565b611167858260ff1681518110610d1557fe5b8051906020012095505b506111ee565b600187510381146111cf576040805162461bcd60e51b815260206004820152601760248201527f73686f756c64206265206174206c617374206c6576656c000000000000000000604482015290519081900360640190fd5b6111df84601081518110610e1457fe5b985050505050505050506111ff565b600101610cfd565b50505050505050505b9392505050565b61120e611bd6565b815161122e57506040805180820190915260008082526020820152610664565b506040805180820190915281518152602082810190820152919050565b60008061125b8360200151611a4f565b83516020948501518201519190039093036101000a90920492915050565b6000806001600160a01b038316611294576000915050610664565b50503b151590565b60408051808201909152601881527f554e50524f4345535345445f53544f524147455f524f4f54000000000000000060208201526000908361131f5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b50600061132c8684610555565b6040805160208082018490528251808303820181529183019092528051910120909150606061135c878784610c15565b905061136a6106b682611206565b98975050505050505050565b6000607b8351116040518060400160405280601481526020017324a72b20a624a22fa12627a1a5afa422a0a222a960611b815250906113f65760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b50818380519060200120146040518060400160405280601481526020017324a72b20a624a22fa12627a1a5afa422a0a222a960611b8152509061147a5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561060d5781810151838201526020016105f5565b505050607b015190565b606061148f82611a00565b6114ca5760405162461bcd60e51b815260040180806020018281038252602a815260200180611c45602a913960400191505060405180910390fd5b60006114d583611ab8565b90508067ffffffffffffffff811180156114ee57600080fd5b5060405190808252806020026020018201604052801561152857816020015b611515611bd6565b81526020019060019003908161150d5790505b509150600061153a8460200151611a4f565b60208501510190506000805b838110156115915761155783611b05565b915060405180604001604052808381526020018481525085828151811061157a57fe5b602090810291909101015291810191600101611546565b50505050919050565b606060008351116115aa57600080fd5b8251600202808311156115bc57600080fd5b8290038067ffffffffffffffff811180156115d657600080fd5b506040519080825280601f01601f191660200182016040528015611601576020820181803683370190505b5091506000835b8285018110156116c6576002810661166c57600486600283048151811061162b57fe5b602001015160f81c60f81b60f81c60ff16901c600f1660f81b84838151811061165057fe5b60200101906001600160f81b031916908160001a9053506116ba565b600086600283048151811061167d57fe5b602001015160f81c60f81b60f81c60ff16901c600f1660f81b8483815181106116a257fe5b60200101906001600160f81b031916908160001a9053505b60019182019101611608565b50825181146116d157fe5b505092915050565b606080826000015167ffffffffffffffff811180156116f757600080fd5b506040519080825280601f01601f191660200182016040528015611722576020820181803683370190505b50905060008160200190506117408460200151828660000151611b95565b5092915050565b6000602082511015611760575080516020820120610664565b816040516020018082805190602001908083835b602083106117935780518252601f199092019160209182019101611774565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040528051906020012060405160200180828152602001915050604051602081830303815290604052805190602001209050610664565b6060600061180c8360200151611a4f565b835190915081900360608167ffffffffffffffff8111801561182d57600080fd5b506040519080825280601f01601f191660200182016040528015611858576020820181803683370190505b5090506000816020019050611874848760200151018285611b95565b50949350505050565b6000606060008351116118bf576040805162461bcd60e51b8152602060048201526005602482015264456d70747960d81b604482015290519081900360640190fd5b60006004846000815181106118d057fe5b60209101015160f81c901c600f1690506000816118f35750600092506002611975565b81600114156119085750600092506001611975565b816002141561191d5750600192506002611975565b816003141561193157506001925082611975565b6040805162461bcd60e51b81526020600482015260146024820152736661696c6564206465636f64696e67205472696560601b604482015290519081900360640190fd5b83611980868361159a565b935093505050915091565b6000805b83518582011080156119a15750825181105b156119f8578281815181106119b257fe5b602001015160f81c60f81b6001600160f81b03191684868301815181106119d557fe5b01602001516001600160f81b031916146119f05790506111ff565b60010161198f565b949350505050565b6020810151805160009190821a9060c0821015611a2257600092505050610664565b5060019392505050565b8051600090600114611a4057506000610664565b50602001515160001a60801490565b8051600090811a6080811015611a69576000915050610664565b60b8811080611a84575060c08110801590611a84575060f881105b15611a93576001915050610664565b60c0811015611aa75760b519019050610664565b60f519019050610664565b50919050565b600080600090506000611ace8460200151611a4f565b602085015185519181019250015b80821015611afc57611aed82611b05565b60019093019290910190611adc565b50909392505050565b8051600090811a6080811015611b1f576001915050610664565b60b8811015611b3357607e19019050610664565b60c0811015611b605760b78103600184019350806020036101000a84510460018201810193505050611ab2565b60f8811015611b745760be19019050610664565b60019290920151602083900360f7016101000a900490910160f51901919050565b5b60208110611bb5578251825260209283019290910190601f1901611b96565b915181516020939093036101000a6000190180199091169216919091179052565b60405180604001604052806000815260200160008152509056fe646976657267656e74206e6f6465206d75737420636f6d65206c61737420696e2070726f6f666966206272616e6368206e6f6465206561636820656c656d656e742068617320746f2062652061206e6962626c6543616e6e6f7420636f6e7665727420746f206c6973742061206e6f6e2d6c69737420524c504974656d2e657874656e73696f6e206e6f64652063616e6e6f74206265206174206c617374206c6576656ca2646970667358221220c80d563817e2b5cf18cad9946eb2c1eeb49dc5bbaa0edad871992087ee9d202064736f6c63430007030033";
