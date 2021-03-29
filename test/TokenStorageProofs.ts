import { ERC20Prover } from "@vocdoni/storage-proofs-eth";
import { BigNumber, Signer, Wallet } from "ethers";
import { ethers } from "hardhat";
import { ERC20Mock, ERC20Mock__factory, Genesis, Genesis__factory, Namespaces, Namespaces__factory, Processes, Processes__factory, Results, Results__factory, TokenStorageProof, TokenStorageProof__factory } from "../typechain";
const hre = require("hardhat");

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
    signers = await ethers.getSigners()
    console.log("signer address: " + await signers[0].getAddress())
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
      ethers.BigNumber.from(1)
    )
    await processes.deployed()

    // log contracts addresses
    console.log("\n ERC20Mock address: " + erc20Mock.address)
    console.log("\n TokenStorageProof address: " + tokenStorageProof.address)
    console.log("\n Namespaces address: " + namespaces.address)
    console.log("\n Results address: " + results.address)
    console.log("\n Processes address: " + processes.address)
  });

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
});



