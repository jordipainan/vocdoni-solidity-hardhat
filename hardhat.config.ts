import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/ethers-v5";
import "@typechain/hardhat";

const config = {
  solidity: {
    version: "0.7.3",
    settings: {
      // https://docs.soliditylang.org/en/v0.7.4/using-the-compiler.html#input-description
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "development",
  networks: {   
    development: {
      url: "http://127.0.0.1:8545",
      gas: 8000000,
      network_id: 15,
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 120000
  }
}

export default config
