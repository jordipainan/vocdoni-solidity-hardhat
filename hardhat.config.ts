import "@nomiclabs/hardhat-waffle";
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
      url: "http://0.0.0.0:8545",
      gas: 8000000,
      network_id: 1337,
      httpHeaders: {
        "Content-Type": "application/json"
      }
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
