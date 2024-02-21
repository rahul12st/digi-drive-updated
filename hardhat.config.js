require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url:"https://polygon-mumbai.g.alchemy.com/v2/go6DBEiz5khMkCSVQoR7CNkIO8lbI1XP",
      accounts:[
        `0x${"267861b4cee6ca9bdf99cdc35e158ebdfbb6d3aaad85720e0627784f367aa656"}`]
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
