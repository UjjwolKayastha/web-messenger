import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
//   console.log("USE SELECTOR", auth);

  const login = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    dispatch(signIn({ email, password }));
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={login} variant="contained" color="primary">
        Login
      </Button>
      <a href="/signup">New Here? Sign Up</a>
    </form>
  );
};
