import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LinkedinIco from "../../icons/linkedin.svg";
import LinkIco from "../../icons/link.svg";
import GithubIco from "../../icons/github.svg";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",

    paddingBottom: "0px",
    background: "transparent",
    height: "100%",
    zIndex: 100,
    position: "relative",
  },
  card: {
    background: "#f1f2f6",
    borderRadius: 0,
    padding: "64px 32px",
    display: "block",
  },
  avatar: {
    width: "200px",
    height: "200px",
  },
  buttons: {
    float: "right",
    height: "100%",
  },
  items: {
    zIndex: 101,
    padding: "0px",
    margin: "0px",
  },
  title: {
    fontSize: "32px",
    margin: "0px",
    paddingTop: "4px",
    color: theme.palette.primary.main,
  },
  subtitle: { fontSize: "20px" },
  span: {
    fontSize: "20px",
    position: "relative",
    top: "10px",
  },
  grid: {
    display: "flex",
    paddingLeft: "50px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
    },
  },
  icons: {
    color: "#8A94A7",
    width: "24px",
  },
  links: {
    color: "black",
    marginLeft: "10px",
    fontSize: "15px",
    bottom: "5px",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      maxWidth: "230px",
      overflow: "hidden",
      display: "inline-flex",
    },
  },
}));

const MeData = {
  name: "Daniel Martín Jiménez",
  photo: "https://damarnez.me/img/yo.jpg",
  linkedin: "https://www.linkedin.com/in/damarnez/",
  webpage: "https://damarnez.me/",
  github: "https://github.com/damarnez",
};

const Me = ({
  data: { name, title, photo, linkedin, webpage, github } = MeData,
}) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Paper className={classes.card}>
        <Grid container className={classes.grid}>
          <Grid key="avatar" item xs={12} sm={3} className={classes.items}>
            <Avatar alt={name} src={photo} className={classes.avatar} />
          </Grid>
          <Grid key="desc" item xs={12} sm={9} className={classes.items}>
            <h3 className={classes.title}>{name}</h3>
            <p className={classes.subtitle}>{title}</p>

            <p>
              <img src={LinkedinIco} className={classes.icons} alt="Linkedin" />
              <a className={classes.links} href={linkedin}>
                {linkedin}
              </a>
            </p>
            {webpage && (
              <p>
                <img
                  src={LinkIco}
                  className={classes.icons}
                  alt="Personal webpage"
                />
                <a className={classes.links} href={webpage}>
                  {webpage}
                </a>
              </p>
            )}
            {github && (
              <p>
                <img src={GithubIco} className={classes.icons} alt="Github" />
                <a className={classes.links} href={github}>
                  {github}
                </a>
              </p>
            )}
          </Grid>
        </Grid>
      </Paper>
    </section>
  );
};

export default Me;
