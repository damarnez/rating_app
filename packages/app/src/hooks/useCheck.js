import { useEffect } from 'react';

import { useBlockchainContext } from '../contexts/blockchain'

const useWallet = () => {
  const {
    store: {
      web3, networkId, address,
    },
    actions: {
      setNetwork, setAddress,
    },
  } = useBlockchainContext();

  useEffect(() => {
    if (web3) {
      console.log('--------- START CHECK ');
      web3.currentProvider.on('accountsChanged', (accounts) => {
        console.log('NEW ADDRESS: ', accounts[0])
        if (accounts[0] !== address) {

          setAddress({ address: accounts[0] })
        }
      });

      web3.currentProvider.on('chainChanged', async (chainId) => {
        if (networkId !== chainId) {
          console.log('NEW CHAIN ID: ', chainId)
          const id = await web3.eth.net.getId();
          setNetwork({ networkId: id })
        }
      });
    }
  }, [web3]);


  return !!web3;
};

export default useWallet;