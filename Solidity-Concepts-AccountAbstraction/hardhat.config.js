require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { API_URL, PRIVATE_KEY , API_KEY} = process.env;
module.exports = {
  solidity: "0.8.19",

  mocha: {
    timeout: 40000,
  },
  networks: {
    // localhost: {
    //   chainId: 31337
    // },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/9gO8RVbokTEMFpjvXe_UooQtrZbNJ79V",
      accounts: ["56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"]
      
      }
  },
  etherscan: {
    apiKey: {
      ethereumsepolia: API_KEY
    },
    plugins: [
      "@nomiclabs/hardhat-etherscan"
    ]
  }
};
