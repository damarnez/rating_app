import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
  // @ts-ignore
  const {
    store: { networkError },
  } = useBlockchainContext();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={networkError}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={networkError}>
          <div className={classes.paper}>
            <h1>Ops!</h1>Please change your network to <b>KOVAN</b>{" "}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
