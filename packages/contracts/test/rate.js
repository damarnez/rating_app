

const Rate = artifacts.require("Rate");
const RateStorage = artifacts.require("RateStorage");

contract("Rate System", function (accounts) {
  const owner = accounts[0];
  const admin = accounts[1];
  const user01 = accounts[2];
  const user02 = accounts[3];

  it("Should be able to rate a user", async () => {
    try {
      const rateContract = await Rate.deployed();
      await rateContract.vote(user02, 5, { from: user01 });
      const result = await rateContract.getRecord(user01, user02, { from: user01 });
      assert.equal(result.rate, 5, "The rate is not stored");
    } catch (error) {
      console.log("ERROR: ", error)
      assert(false);
    }
  });
  it("Should not be able to rate a user more than one time the same user", async () => {
    try {
      const rateContract = await Rate.deployed();
      await rateContract.vote(user02, 5, { from: user01 });
      await rateContract.vote(user02, 3, { from: user01 });
    } catch (error) {
      assert.equal(error.reason, 'One time by user');
    }
  });
  it("Should not be able to rate biger than 5 ", async () => {
    try {
      const rateContract = await Rate.deployed();
      await rateContract.vote(user02, 6, { from: user01 });
    } catch (error) {
      assert.equal(error.reason, 'Param rate need to be 5 or less than 5');
    }
  });
  it("Should not be able to rate less than 1 ", async () => {
    try {
      const rateContract = await Rate.deployed();
      await rateContract.vote(user02, 0, { from: user01 });
    } catch (error) {
      assert.equal(error.reason, 'Param rate need to be grater than 0');
    }
  });
});
