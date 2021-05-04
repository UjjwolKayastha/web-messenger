import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { MenuItems } from "./HeaderItems";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  userName: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 100,
    color: "#FFFEFE",
    textAlign: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const Header = () => {
  const classes = useStyles();

  const authUser = useSelector((state) => state.auth);
  // console.log("AUTNECNINANSNAKLS", authUser);

  const logo = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      Web Messenger
    </Typography>
  );

  const toolBar = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {logo}
        <Typography className={classes.userName} variant="h6" component="h4">
          {authUser.authenticated ? `Hi ${authUser.name} 👋` : ""}
        </Typography>
        <div>{MenuItems()}</div>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar className={classes.header}>{toolBar()}</AppBar>
    </header>
  );
};
