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
    if (web3 && web3.provider) {
      web3.provider.on('accountsChanged', (accounts) => {
        if (accounts[0] !== address)
          setAddress({ address: accounts[0] })
      });

      web3.provider.on('chainChanged', (chainId) => {
        if (networkId !== chainId)
          setNetwork({ networkId: chainId })
      });
    }
  }, [web3]);


  return !!web3;
};

export default useWallet;