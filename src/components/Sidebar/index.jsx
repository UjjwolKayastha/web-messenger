import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    flex: 1,
    borderRight: "1px solid grey",
    "& p": {
      display: "flex",
      justifyContent: "space-between",
      padding: "0 10px",
    },
  },
});

export const Sidebar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <p>
        UJJWOL<span>online</span>
      </p>
      <p>
        KAYASTHA
        <span>offline</span>
      </p>
    </div>
  );
};
