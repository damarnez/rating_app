import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Blockies from "react-blockies";
import { useAppContext } from "../../contexts/app";
import Rating from "@material-ui/lab/Rating";
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
  paper: {
    backgroundColor: "white",
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FilterListModal({
  address,
  open = true,
  handleOpenModal,
}) {
  const classes = useStyles();
  const [ui, setUI] = useState("list");
  const [value, setValue] = useState(0);
  const {
    store: { filterRates },
    actions: { fetchRatesByUser },
  } = useAppContext();

  useEffect(() => {
    fetchRatesByUser(address);
  }, []);

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
                setValue(newValue);
              }}
            />
            <h2> List by user </h2>
            <List rates={filterRates[address]} size={5} />
          </div>
        );
      case "processing":
        return <div className={classes.paper}>PROCESSING TRANSACTION</div>;
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
        onClose={handleOpenModal()}
      >
        {getSteps()}
      </Modal>
    </>
  );
}
