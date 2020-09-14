import React, { useEffect, useState, useRef } from "react";
import useCheck from "../hooks/useCheck";
import useWeb3 from "../hooks/useWeb3";

import { useBlockchainContext } from "../contexts/blockchain";
import Header from "./Header";
import Me from "./Me";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

// const Market = React.lazy(() => import("./Market"));
// const CreateItem = React.lazy(() => import("./CreateItem"));
// const Detail = React.lazy(() => import("./Detail"));
// const MyMarket = React.lazy(() => import("./MyMarket"));
// const AboutUs = React.lazy(() => import("./AboutUs"));

const useStyles = makeStyles((theme) => ({
  layout: {
    flex: 1,
    height: "100%",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    heigth: "100%",
    minHeight: "80vh",
  },
  button: {
    margin: theme.spacing(2),
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

  const classes = useStyles();
  const modalRefs = useRef(null);

  const {
    store: { contracts, address, networkId, network },
  } = useBlockchainContext();

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
  }, []);

  useEffect(() => {
    if (contracts) {
      setLoading(false);
    }
  }, [network, contracts]);

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

      <Me />
      <div ref={modalRefs} />
    </main>
  );
}

export default App;
