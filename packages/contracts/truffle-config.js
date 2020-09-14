/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
const HDWalletProvider = require("truffle-hdwallet-provider");
const ownerKey = process.env.PRIVATE_KEY;
const infuraKey = process.env.INFURA_KEY;
const infuraApi = network => `https://${network}.infura.io/v3/${infuraKey}`;

const privateKeys = [ownerKey];


module.exports = {
  networks: {
    develop: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // Match any network id
      }
    },
    kovan: {
      gas: 8000000,
      gasPrice: 1000000000,
      provider: function () {
        return new HDWalletProvider(privateKeys, infuraApi("kovan"), 0, 1);
      },
      skipDryRun: true,
      network_id: "42"
    },
    mainnet: {
      gas: 1317446,
      gasPrice: 23000000000,
      network_id: "1",
      skipDryRun: false,
      provider: function () {
        return new HDWalletProvider(privateKeys, infuraApi("mainnet"));
      }
    }
  },


  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },


  mocha: {},

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  plugins: ["solidity-coverage", "truffle-security"]

};
