import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { parseNetwork } from "../utils";
import contractsKovan from "@ratingapp/share/kovan/latest/contracts.json";

const EnabledNetworks = {
  "42": "KOVAN",
};

const initialState = {
  address: null,
  error: "",
  contracts: { 42: contractsKovan },
  web3: null,
  networkId: parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID || "1", 10),
  network: parseNetwork(
    parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID || "1", 10)
  ),
  networkError: false,
};

const BlockchainContext = createContext({});

export function useBlockchainContext() {
  return useContext(BlockchainContext);
}

const reducers = (state, action) => {

  switch (action.type) {
    case "SET_WEB3": {
      return {
        ...state,
        ...{
          web3: action.data,
        },
      };
    }
    case "SET_ADDRESS": {
      return {
        ...state,
        ...{
          address: action.data.address,
        },
      };
    }
    case "SET_INSTANCE": {
      return {
        ...state,
        ...{
          instances: action.data,
        },
      };
    }
    case "SET_NETWORK": {
      console.log('ACTION: ', action)
      return {
        ...state,
        ...{
          networkId: action.data.networkId,
          network: parseNetwork(action.data.networkId),
          networkError: false
        },
      };
    }
    case "SET_NETWORK_ERROR": {
      return {
        ...state,
        ...{
          networkError: action.data,
        },
      };
    }
    case "SET_DATA_NET": {
      return {
        ...state,
        ...{
          networkId: action.data.networkId,
          network: parseNetwork(action.data.networkId),
          address: action.data.address,
          web3: action.data.web3,
          networkError: false
        },
      };
    }
    default:
      return state;
  }
}




export function Updater() {
  // 
  return null;
}

export default function Provider({ children }) {
  const [store, dispatch] = useReducer(reducers, {}, () => initialState);
  const setWeb3 = useCallback((newWeb3) => dispatch({ type: "SET_WEB3", data: newWeb3 }), []);
  const setNewInstance = useCallback((instances) =>
    dispatch({ type: "SET_INSTANCE", data: instances }), []);

  const setCheckBlockchain = useCallback((response) =>
    dispatch({ type: "SET_BLOCKCHAIN_CHECK", data: response }), []);

  const setNetwork = useCallback(({ networkId }) => {
    if (Object.keys(EnabledNetworks).indexOf(networkId.toString()) > -1) {
      return dispatch({
        type: "SET_NETWORK",
        data: { networkId },
      });

    } else {
      return dispatch({
        type: "SET_NETWORK_ERROR",
        // @ts-ignore
        data: true,
      })
    }
  }, []);
  const setAddress = useCallback((response) => {
    window.localStorage.setItem("eth_address", response.address);
    dispatch({ type: "SET_ADDRESS", data: response })
  }, []);


  const setNetworkData = async ({ address, networkId, web3 }) => {

    if (Object.keys(EnabledNetworks).indexOf(networkId.toString()) > -1 && address) {
      // Load information when we change network
      window.localStorage.setItem("eth_address", address);
      return dispatch({
        type: "SET_DATA_NET",
        data: {
          networkId,
          address,
          web3
        },
      });

    } else {
      return dispatch({
        type: "SET_NETWORK_ERROR",
        // @ts-ignore
        data: true,
      });
    }
  };
  const values = { store, actions: { setWeb3, setNewInstance, setCheckBlockchain, setNetwork, setAddress, setNetworkData } };

  return <BlockchainContext.Provider value={values}>{children}</BlockchainContext.Provider>;
}