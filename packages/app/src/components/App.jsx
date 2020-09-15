import React, { useEffect, useState } from "react";
import useCheck from "../hooks/useCheck";
import useWeb3 from "../hooks/useWeb3";

import { useBlockchainContext } from "../contexts/blockchain";
import { useAppContext } from "../contexts/app";
import Header from "./Header";
import Me from "./Me";
import List from "./List";
import FilterList from "./FilterList";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  layout: {
    flex: 1,
    height: "100%",
    marginTop: "100px",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    heigth: "100%",
    minHeight: "80vh",
  },
  placeholder: {
    minHeight: "100vh",
    marginTop: "45%",
  },
  container: {
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
  },
}));

function App() {
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const classes = useStyles();

  const {
    store: { contracts, address, network },
  } = useBlockchainContext();
  const {
    store: { rates },
    actions: { fetchRates },
  } = useAppContext();

  useCheck();

  const { connect } = useWeb3();

  // Enabling connections
  useEffect(() => {
    // Auto connect
    if (
      address === null &&
      window.localStorage.getItem("eth_address") !== null
    ) {
      try {
        connect();
      } catch (e) {
        console.error(e);
      }
    }

    fetchRates();
  }, [address, connect, fetchRates]);

  useEffect(() => {
    if (contracts && rates) {
      setLoading(false);
    }
  }, [network, contracts, rates]);

  const handleOpenCloseModal = (address) => () => {
    setFilter(address);
    setOpen(!open);
  };

  const Loading = () => (
    <main className={classes.layout}>
      <div className={classes.loading}>
        <div className={classes.placeholder}>
          <Fade
            in={true}
            style={{
              transitionDelay: isLoading ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </div>
      </div>
    </main>
  );

  return (
    <main className={classes.layout}>
      <Header />
      {isLoading && <Loading />}
      {!isLoading && <div className={classes.container}></div>}
      {open && (
        <FilterList
          address={filter}
          handleOpenCloseModal={handleOpenCloseModal}
        />
      )}
      <section>
        <List rates={rates} handleOpenCloseModal={handleOpenCloseModal} />
        <Me />
      </section>
    </main>
  );
}

export default App;
