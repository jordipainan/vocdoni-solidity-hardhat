import { BigNumber, Signer, Wallet } from "ethers";
import { ethers } from "hardhat";
import { ERC20Mock, ERC20Mock__factory, Genesis, Genesis__factory, Namespaces, Namespaces__factory, Processes, Processes__factory, Results, Results__factory, TokenStorageProof, TokenStorageProof__factory } from "../typechain";
import { ERC20Prover } from "./storage-proofs-eth";

const BALANCE_MAPPING_SLOT = 4

describe("Token", function () {
  let signers: Signer[];

  let erc20Mock: ERC20Mock
  let tokenStorageProof: TokenStorageProof
  let processes: Processes
  let namespaces: Namespaces
  let results: Results
  let genesis: Genesis

  let mintBlockNumber, transferBlockNumber: number | BigNumber
  let holder, otherHolder: Wallet
  let mintProof, transferProof
  let ethProver: ERC20Prover

  before("set up accounts", async function () {
    // create new account
    await ethers.provider.send("personal_importRawKey", ["8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f", ""])
    // get signers
    signers = await ethers.getSigners()
    for (const k in signers) {
      console.log("Signer " + k + " address: " + await signers[k].getAddress())
      
    }
    // transfer from coinbase to new account
    const tx = {from: await signers[0].getAddress(), to: await signers[1].getAddress(), value: '0x' + ethers.utils.parseUnits("1", "ether").toString()}
    const txResult = await ethers.provider.send("personal_sendTransaction", [tx, ""])
    await ethers.provider.waitForTransaction(txResult, 1)
  })

  before("deploy contracts", async function () {
    // contracts factory
    const erc20MockFactory = (await ethers.getContractFactory("ERC20Mock", signers[0])) as ERC20Mock__factory
    const tokenStorageProofFactory = (await ethers.getContractFactory("TokenStorageProof", signers[0])) as TokenStorageProof__factory
    const namespacesFactory = (await ethers.getContractFactory("Namespaces", signers[0])) as Namespaces__factory
    const processesFactory = (await ethers.getContractFactory("Processes", signers[0])) as Processes__factory
    const resultsFactory = (await ethers.getContractFactory("Results", signers[0])) as Results__factory
    const genesisFactory = (await ethers.getContractFactory("Genesis", signers[0])) as Genesis__factory

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
    console.log("\n ERC20Mock address: " + erc20Mock.address)
    console.log("\n TokenStorageProof address: " + tokenStorageProof.address)
    console.log("\n Namespaces address: " + namespaces.address)
    console.log("\n Results address: " + results.address)
    console.log("\n Processes address: " + processes.address)
  });


  it('Should register', async() => {
    const mintTx = await (await erc20Mock.mint(await signers[1].getAddress(), 1000)).wait()
    const erc20Prover = new ERC20Prover()
    console.log(mintTx.blockNumber)
    const account_proof = await erc20Prover.getProof(erc20Mock.address, [], mintTx.blockNumber, false)
    const balanceSlot = await tokenStorageProof["getBalanceSlot(address,uint256)"](await signers[1].getAddress(), BALANCE_MAPPING_SLOT)
    const holder_proof = await erc20Prover.getProof(erc20Mock.address, [balanceSlot], mintTx.blockNumber, false)
    console.log(account_proof)
    console.log(balanceSlot)
    console.log(holder_proof)
    const t2 = tokenStorageProof.connect(signers[1])
    let unlokedAccount = await ethers.provider.send("personal_unlockAccount", [await signers[1].getAddress(), ""])
    console.log(unlokedAccount)
    let registered = await (await t2["registerToken(address,uint256,bytes,bytes,bytes,uint256)"](erc20Mock.address, mintTx.blockNumber, holder_proof.storageProofsRLP[0], account_proof.blockHeaderRLP, account_proof.accountProofRLP, BALANCE_MAPPING_SLOT)).wait()
    //let registered = await tokenStorageProof.registerToken()
    console.log(registered)
    const isRegistered = await tokenStorageProof["isRegistered(address)"](erc20Mock.address)
    if (!isRegistered) {
      throw new Error("FCK!")
    }
  })
  
  /*
  before("mint ERC20 tokens", async function () {
    await erc20Mock.mint(await signers[0].getAddress(), 1000)
    mintBlockNumber = await ethers.provider.getBlockNumber()
    ethProver = new ERC20Prover(ethers.provider)
    mintProof = await ethProver.getProof(erc20Mock.address, [], mintBlockNumber, false)
  })

  it('should register a token if msg.sender is holder', async () => {
    let balanceSlot = await tokenStorageProof.getBalanceSlot(await signers[0].getAddress(), BALANCE_MAPPING_SLOT)
    let proof = await ethProver.getProof(await signers[0].getAddress(), [balanceSlot], mintBlockNumber, false)
    let registered = await tokenStorageProof.registerToken(await signers[0].getAddress(), mintBlockNumber, proof.storageProofsRLP[0], mintProof.blockHeaderRLP, mintProof.accountProofRLP, BALANCE_MAPPING_SLOT)
    console.log(registered)
  })
  */
});



