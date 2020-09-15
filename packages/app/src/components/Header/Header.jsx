import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Wallets from "./Header.Wallets";
import useWeb3 from "../../hooks/useWeb3";
import NetworkMessage from "./Header.Network";
import { useBlockchainContext } from "../../contexts/blockchain";
import Blockies from "react-blockies";
import { parseNetwork } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 100,
    "&::focus": {
      outline: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  header: {
    boxShadow: "none",
  },
}));

const Header = () => {
  const classes = useStyles();
  const { connect, enable, check } = useWeb3();
  const {
    store: { address, open, networkId },
    actions: { setOpen },
  } = useBlockchainContext();

  const handleClickConnect = useCallback(async () => {
    if (await check()) {
      try {
        await connect();
      } catch (err) {
        await enable();
      }
    } else {
      setOpen(true);
    }
  }, [check, connect, enable, setOpen]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const CheckLogin = () => {
    if (address) {
      // LOGGED
      return (
        <React.Fragment>
          <IconButton>
            <Blockies seed={address || "none"} className="identicon" />
          </IconButton>
        </React.Fragment>
      );
    } else {
      // NOT LOGGED
      return (
        <>
          <Button color="inherit" onClick={handleClickConnect}>
            Login
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <AppBar position="fixed" color="transparent" className={classes.header}>
        <Toolbar>
          <Typography className={classes.title}>
            {parseNetwork(networkId)}
          </Typography>

          <CheckLogin></CheckLogin>
        </Toolbar>
      </AppBar>
      <Wallets open={open} handleOpen={handleOpen} handleClose={handleClose} />
      <NetworkMessage />
    </>
  );
};

export default Header;
