const Rate = artifacts.require("Rate");
const RateStorage = artifacts.require("RateStorage");

module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0];

  await deployer.deploy(RateStorage, { from: owner });
  console.log(' STORAGE ADDRESS :', RateStorage.address);
  await deployer.deploy(Rate, RateStorage.address, { from: owner });
  console.log('MIGRATION FINISHED ');
};
