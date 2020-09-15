import React from "react";
import Blockies from "react-blockies";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  star: {
    margin: "10px",
    fontSize: "50px",
  },
  byBox: {
    float: "right",
    fontSize: "30px",
  },
  card: {
    background: "#f1f2f6",
    borderRadius: 0,
    padding: "30px 30px",
    display: "block",
    margin: "20px",
  },
}));

const Rate = ({
  data: { from, to, rate, timestamp },
  size = 10,
  handleOpenCloseModal = () => () => {},
}) => {
  const classes = useStyles();
  const date = new Date(timestamp * 1000);
  return (
    <>
      <IconButton
        color="primary"
        component="span"
        onClick={handleOpenCloseModal(to)}
      >
        <Blockies seed={to || "none"} className="identicon" scale={10} />
      </IconButton>
      <Rating
        className={classes.star}
        name="disabled"
        value={parseInt(rate)}
        disabled
      />
      <div className={classes.byBox}>
        By :{" "}
        <IconButton
          color="primary"
          component="span"
          onClick={handleOpenCloseModal(from)}
        >
          <Blockies seed={from || "none"} className="identicon" />
        </IconButton>
      </div>
      <p>
        The user <b>{from}</b> rate the user <b>{to}</b> with <b>{rate}</b> at{" "}
        {date.toISOString()}
      </p>
    </>
  );
};

export default Rate;
