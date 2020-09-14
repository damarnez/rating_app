const Rate = artifacts.require("Rate");
const RateStorage = artifacts.require("RateStorage");
const package = require('../../../package.json');
const fs = require('fs');
const path = require('path');

const saveVersion = (v, network, data) => {
  const pathVersion = `/../../share/${network}/v-${v}`;
  const pathLatest = `/../../share/${network}/latest`
  const dirVersion = path.join(__dirname, pathVersion);
  const dirLatest = path.join(__dirname, pathLatest);
  // Create folders
  if (fs.existsSync(dirVersion)) fs.rmdirSync(dirVersion, { recursive: true });
  fs.mkdirSync(dirVersion, { recursive: true });
  if (fs.existsSync(dirLatest)) fs.rmdirSync(dirLatest, { recursive: true });
  fs.mkdirSync(dirLatest, { recursive: true });
  // Create file
  fs.writeFileSync(path.join(dirVersion, 'contracts.json'), JSON.stringify(data));
  fs.writeFileSync(path.join(dirLatest, 'contracts.json'), JSON.stringify(data));
  fs.writeFileSync(path.join(dirLatest, 'RateAbi.json'), JSON.stringify(data.Rate.abi));
};


module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0];
  // DEPLOY SMART CONTRACTS
  await deployer.deploy(RateStorage, { from: owner });
  await deployer.deploy(Rate, RateStorage.address, { from: owner });
  // SET ADMIN
  const rateStorage = await RateStorage.deployed();
  console.log(' RATE ', Rate.address);
  rateStorage.setAdmin(Rate.address);

  console.log('# MIGRATION FINISHED ');
  if (network !== 'test') {
    saveVersion(package.version, network, {
      Rate: {
        address: Rate.address,
        abi: Rate.abi
      },
      RateStorage: {
        address: RateStorage.address,
        abi: RateStorage.abi
      }
    });
  }
};
