import Web3 from "web3";
import { useBlockchainContext } from "../contexts/blockchain";

const useWeb3 = () => {
  const {
    store: {
      web3
    },
    actions: {
      setNetworkData
    }
  } = useBlockchainContext();

  const enable = async () => {

    if (web3) {
      web3.currentProvider.enable();
      web3.currentProvider.autoRefreshOnNetworkChange = false;
      const accounts = await web3.eth.getAccounts();
      const net = await web3.eth.net.getId();
      if (accounts && accounts.length > 0) {
        setNetworkData({ web3, address: accounts[0], networkId: net });
      }
    }
  };

  const connect = async () => {
    //@ts-ignore
    if (window.ethereum) {
      //@ts-ignore
      const web3 = new Web3(window.ethereum);

      window.instance = web3;
      web3.currentProvider.autoRefreshOnNetworkChange = false;
      await web3.currentProvider.enable();


      const accounts = await web3.eth.getAccounts();
      const net = await web3.eth.net.getId();
      if (accounts && accounts.length > 0) {
        setNetworkData({ web3, address: accounts[0], networkId: net });
      }

    } else {
      alert("Metamask Web3 are not found!");
    }
  };
  const check = () => {
    //@ts-ignore
    if (window.ethereum) {
      return true;
    }
    return false;
  };


  return { connect, enable, check };
};

export default useWeb3;
