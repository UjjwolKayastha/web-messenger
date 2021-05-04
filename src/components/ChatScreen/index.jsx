import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    flex: 3,
  },
});
export const ChatScreen = () => {
  const { container } = useStyles();
  return <div className={container}>CHAT SREEEEEEEn</div>;
};
