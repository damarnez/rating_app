
import React, { createContext, useReducer, useContext, useCallback } from 'react';
import { getRates } from '../services'
const initialState = {
  rates: null,
  filterRates: {},

};

const AppContext = createContext({});

export function useAppContext() {
  return useContext(AppContext);
}

const reducers = (state, action) => {

  switch (action.type) {
    case "SET_RATES": {
      return {
        ...state,
        ...{
          rates: action.data,
        },
      };
    }
    case "SET_FILTER_RATES": {
      return {
        ...state,
        ...{
          filterRates: { ...action.data, ...state.filterRates },
        },
      };
    }

    default:
      return state;
  }
}

export default function Provider({ children }) {
  const [store, dispatch] = useReducer(reducers, {}, () => initialState);
  const fetchRates = useCallback(async () => {
    const data = await getRates();

    dispatch({ type: "SET_RATES", data });
  }, []);
  const fetchRatesByUser = useCallback(async (address) => {
    const rate = await getRates(address);
    const data = { [address]: rate };
    dispatch({ type: "SET_FILTER_RATES", data });
  }, []);


  const values = { store, actions: { fetchRates, fetchRatesByUser } };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}