import { useState, useEffect } from "react";

import { useBlockchainContext } from "../contexts/blockchain";

import { parseNetwork } from "../utils";

const useWallet = () => {
  const {
    store: {
      contracts: ethContracts,
      instances: instanceContracts,
      networkId,
      web3,
    },
    actions: {
      setNewInstance,
    },
  } = useBlockchainContext();

  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (web3 && ethContracts) {

      setWallet({
        web3,
        ethContracts,
        getNetwork: async () => {
          try {
            if (web3) {
              const id = await web3.eth.net.getId();
              return { id, name: parseNetwork(id) };
            }
            return {
              id: parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID || "1", 10),
              name: parseNetwork(
                parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID || "1", 10)
              ),
            };
          } catch (err) {
            console.error("[useWallet] Error detect network");
            return {
              id: parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID || "1", 10),
              name: parseNetwork(
                parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID || "1", 10)
              ),
            };
          }
        },
        getContractsNetwork: () => {
          return Object.keys(ethContracts)
            .map((x) => parseNetwork(Number(x)))
            .filter((availableId) =>
              ["mainnet", "kovan", "test"].find((id) => id === availableId)
            );
        },
        load: async (name, address) => {
          const netId = await web3.eth.net.getId();

          if (!ethContracts[netId][name]) {
            throw new Error(
              `[useWallets] Contract not found in current network ${netId}`
            );
          }
          const currentAddress = address
            ? address
            : ethContracts[netId][name].address;
          console.log('ETH CONTRACTS', ethContracts, ' Current Address:', currentAddress)
          if (
            instanceContracts[currentAddress] &&
            instanceContracts[currentAddress][name]
          ) {
            return instanceContracts[netId][name];
          }
          const contract = new web3.eth.Contract(
            ethContracts[netId][name].abi,
            currentAddress
          );
          if (!instanceContracts[currentAddress]) instanceContracts[netId] = {};
          instanceContracts[netId] = {
            ...instanceContracts[netId],
            [currentAddress]: contract,
          };
          setNewInstance(instanceContracts);
          return contract;
        },
        utils: web3.utils,
      });
    }
  }, [ethContracts, web3, networkId, instanceContracts, setNewInstance]);

  return wallet;
};

export default useWallet;
