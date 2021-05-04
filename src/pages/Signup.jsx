import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { signUp } from "../redux";
import { useDispatch, useSelector } from "react-redux";
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

export const Signup = () => {
  const classes = useStyles();

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const registerUser = (e) => {
    e.preventDefault();
    const user = {
      fullName,
      email,
      password,
    };
    dispatch(signUp(user));
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        value={fullName}
        onChange={(e) => setFullname(e.target.value)}
        label="Full name"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={registerUser} variant="contained" color="primary">
        Sign Up
      </Button>
      <a href="/login">Already have account? Sign In</a>
    </form>
  );
};
