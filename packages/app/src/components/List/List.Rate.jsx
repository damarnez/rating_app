import React from "react";
import Blockies from "react-blockies";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

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
  data: { from, to, rate },
  size = 10,
  handleOpenModal = () => () => {},
}) => {
  const classes = useStyles();
  return (
    <>
      <span onClick={handleOpenModal(to)}>
        <Blockies seed={to || "none"} className="identicon" scale={10} />
      </span>
      <Rating
        className={classes.star}
        name="disabled"
        value={parseInt(rate)}
        disabled
      />
      <div className={classes.byBox}>
        By :{" "}
        <span onClick={handleOpenModal(from)}>
          <Blockies seed={from || "none"} className="identicon" />
        </span>
      </div>
      <p>
        The user <b>{from}</b> rate the user <b>{to}</b> with <b>{rate}</b>
      </p>
    </>
  );
};

export default Rate;
