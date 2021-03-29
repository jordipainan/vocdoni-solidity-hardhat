import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

const config = {
  solidity: {
    version: "0.7.3"
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    development: {
      url: "http://0.0.0.0:8545",
      gasPrice: 0,
      gasLimit: 8000000,
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
