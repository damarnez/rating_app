import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Blockies from "react-blockies";
import { useAppContext } from "../../contexts/app";
import Rating from "@material-ui/lab/Rating";
import useWallet from "../../hooks/useWallet";
import { useBlockchainContext } from "../../contexts/blockchain";
import List from "../List";

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
  star: {
    margin: "10px",
    fontSize: "50px",
  },
  paper: {
    backgroundColor: "white",
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FilterListModal({
  address,
  open = true,
  handleOpenCloseModal,
}) {
  const classes = useStyles();
  const [ui, setUI] = useState("list");
  const [value, setValue] = useState(0);

  const {
    store: { filterRates },
    actions: { fetchRatesByUser, fetchRates },
  } = useAppContext();
  const {
    store: { address: account },
  } = useBlockchainContext();

  const wallet = useWallet();

  useEffect(() => {
    fetchRatesByUser(address);
  }, [address, fetchRatesByUser]);

  const handleVote = async (value) => {
    try {
      if (wallet) {
        setUI("processing");
        const rateContract = await wallet.load("Rate");
        await rateContract.methods.vote(address, value).send({ from: account });
        // Fetch data again
        await fetchRates();
        await fetchRatesByUser(address);
        setUI("success");
        setValue(0);
      }
    } catch (error) {
      console.error("Error on interact with the blockchain :" + error.message);
      setUI("error");
    }
  };
  const getSteps = () => {
    // eslint-disable-line
    switch (ui) {
      case "list":
        return (
          <div className={classes.paper}>
            <Blockies
              seed={address || "none"}
              className="identicon"
              scale={10}
            />
            <Rating
              className={classes.star}
              name="rating-control"
              value={value}
              onChange={(event, newValue) => {
                handleVote(newValue);
              }}
              disabled={value > 0}
            />
            <h2> List by user </h2>
            <List rates={filterRates[address]} size={5} />
          </div>
        );
      case "processing":
        return (
          <div className={classes.paper}>
            <p>Check your MetaMask wallet to proceed.</p>
          </div>
        );
      case "success":
        return (
          <div className={classes.paper}>
            <p> Thanks! for rating.</p>
          </div>
        );
      case "error":
        return (
          <div className={classes.paper}>
            <p> Something whent wrong :( </p>
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
        closeAfterTransition
        open={open}
        onClose={handleOpenCloseModal()}
      >
        {getSteps()}
      </Modal>
    </>
  );
}
