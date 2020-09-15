import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Rate from "./List.Rate";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    paddingTop: "50px",
    paddingBottom: "0px",
    background: "transparent",
    minHeight: "500px",
    height: "100%",
    zIndex: 100,
    position: "relative",
  },
  card: {
    background: "#f1f2f6",
    borderRadius: 0,
    padding: "30px 30px",
    display: "block",
    margin: "20px",
  },
}));
const List = ({ rates, size, handleOpenModal }) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      {rates &&
        rates.map((rate) => (
          <Paper
            key={`${rate.address}-${rate.rate}`}
            className={classes.card}
            elevation={3}
          >
            <Rate data={rate} size={size} handleOpenModal={handleOpenModal} />
          </Paper>
        ))}
    </section>
  );
};

export default List;
