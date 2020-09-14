import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useWeb3 from "../../hooks/useWeb3";
import { useBlockchainContext } from "../../contexts/blockchain";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    boxShadow: "none",
    "&::focus": {
      outline: "none",
    },
  },
  paper: {
    backgroundColor: "white",
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [ui, setUI] = useState("login");
  const { check } = useWeb3();

  const {
    store: { address, web3 },
  } = useBlockchainContext();

  useEffect(() => {
    if (!check()) {
      setUI("no_wallet");
    }
  }, [check]);

  useEffect(() => {
    if (!check()) {
      setUI("no_wallet");
    }
  }, [check]);

  useEffect(() => {
    console.log(" WEB3 ", web3, "address:", address);
    if (web3) {
      if (address) setUI("success");
      else setUI("enable");
    }
  }, [web3, address]);

  const getSteps = () => {
    // eslint-disable-line
    switch (ui) {
      case "check_connection":
        return (
          <div className={classes.paper}>
            <h2> Connectig your wallet! Please install Metamask</h2>
          </div>
        );
      case "no_wallet":
        return (
          <div className={classes.paper}>
            <p>
              <h1>No wallet found</h1>Please install{" "}
              <a
                href="https://metamask.io/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <b>METAMASK</b>
              </a>
            </p>
          </div>
        );
      default:
      //Do Nothing
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open || false}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>{getSteps()}</Fade>
      </Modal>
    </>
  );
}
