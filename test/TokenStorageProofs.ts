import { ERC20Prover } from "@vocdoni/storage-proofs-eth";
import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { ERC20Mock, ERC20Mock__factory, Genesis, Genesis__factory, Namespaces, Namespaces__factory, Processes, Processes__factory, Results, Results__factory, TokenStorageProof, TokenStorageProof__factory } from "../typechain";

const BALANCE_MAPPING_SLOT = 4

describe("Token storage proof", function () {
  
  let signers: Signer[];
  let deployerAddress, holderAddress: string

  let erc20MockFactory, tokenStorageProofFactory, namespacesFactory, processesFactory, resultsFactory, genesisFactory

  let erc20Mock: ERC20Mock
  let tokenStorageProof: TokenStorageProof
  let processes: Processes
  let namespaces: Namespaces
  let results: Results
  let genesis: Genesis

  let mintBlockNumber: number

  let Prover: ERC20Prover

  let account_proof, holder_proof: any
  let holderBalanceSlot: string

  before("set up accounts", async() => {
    console.log("Setting up accounts")
    // create new account
    await ethers.provider.send("personal_importRawKey", ["8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f", ""])
    // get signers
    signers = await ethers.getSigners()
    deployerAddress = await signers[0].getAddress()
    holderAddress = await signers[1].getAddress()
    // transfer from coinbase to new account
    const tx = {from: deployerAddress, to: holderAddress, value: '0x' + ethers.utils.parseUnits("1", "ether").toString()}
    const txResult = await ethers.provider.send("personal_sendTransaction", [tx, ""])
    await ethers.provider.waitForTransaction(txResult, 1)
    for (const k in signers) {
      console.log("Signer " + k + " address: " + await signers[k].getAddress() + " with balance: " + await signers[k].getBalance())
    }
    // unlock holder account
    await ethers.provider.send("personal_unlockAccount", [holderAddress, ""])
  })

  before("deploy contracts", async() => {
    console.log("Deploying contracts from: " + deployerAddress)
    // contracts factory
    erc20MockFactory = (await ethers.getContractFactory("ERC20Mock", signers[0])) as ERC20Mock__factory
    tokenStorageProofFactory = (await ethers.getContractFactory("TokenStorageProof", signers[0])) as TokenStorageProof__factory
    namespacesFactory = (await ethers.getContractFactory("Namespaces", signers[0])) as Namespaces__factory
    processesFactory = (await ethers.getContractFactory("Processes", signers[0])) as Processes__factory
    resultsFactory = (await ethers.getContractFactory("Results", signers[0])) as Results__factory
    genesisFactory = (await ethers.getContractFactory("Genesis", signers[0])) as Genesis__factory
    // deploy contracts
    erc20Mock = await erc20MockFactory.deploy("Jordi", "JDI", 18)
    await erc20Mock.deployed()
    tokenStorageProof = await tokenStorageProofFactory.deploy()
    await tokenStorageProof.deployed()
    namespaces = await namespacesFactory.deploy()
    await namespaces.deployed()
    genesis = await genesisFactory.deploy()
    await genesis.deployed()
    results = await resultsFactory.deploy(genesis.address)
    await results.deployed()
    processes = await processesFactory.deploy(
      "0x0000000000000000000000000000000000000000",
      namespaces.address,
      results.address,
      tokenStorageProof.address,
      ethers.BigNumber.from(ethers.provider.network.chainId),
      ethers.BigNumber.from(0)
    )
    await processes.deployed()
    // log contracts addresses
    console.log("ERC20Mock address: " + erc20Mock.address)
    console.log("TokenStorageProof address: " + tokenStorageProof.address)
    console.log("Namespaces address: " + namespaces.address)
    console.log("Results address: " + results.address)
    console.log("Processes address: " + processes.address)
  });

  before("ERC20Prover", () => {
    console.log("Creating ERC20Prover with the current provider")
    Prover = new ERC20Prover(ethers.provider)
  })

  it('should register a token if msg.sender is holder', async() => {
    console.log("Minting tokens for holder: " + holderAddress)
    const mintTx = await (await erc20Mock.mint(holderAddress, 1000)).wait()
    mintBlockNumber = mintTx.blockNumber
    console.log("Generating proofs")
    account_proof = await Prover.getProof(erc20Mock.address, [], mintBlockNumber, false)
    holderBalanceSlot = await tokenStorageProof["getBalanceSlot(address,uint256)"](holderAddress, BALANCE_MAPPING_SLOT)
    holder_proof = await Prover.getProof(erc20Mock.address, [holderBalanceSlot], mintBlockNumber, false)
    // connect holder to token-storage-proof contract
    const holderTokenStorageProof = tokenStorageProof.connect(signers[1])
    // register token to the contract
    console.log("Registering token")
    let registered = await (await holderTokenStorageProof["registerToken(address,uint256,bytes,bytes,bytes,uint256)"](erc20Mock.address, mintBlockNumber, holder_proof.storageProofsRLP[0], account_proof.blockHeaderRLP, account_proof.accountProofRLP, BALANCE_MAPPING_SLOT)).wait()
    // check if sucessfuly registered
    const isRegistered = await tokenStorageProof["isRegistered(address)"](erc20Mock.address)
    expect(isRegistered).to.be.true
  })
});
