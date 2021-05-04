import { makeStyles } from "@material-ui/core";
import React from "react";
import { ChatScreen, Header, Sidebar } from "../components";

const useStyles = makeStyles({
  section: {
    marginTop: 80,
    display: "flex",
    justifyContent: "space-between",
    gap: 5,
  },
});

export const Home = () => {
  const { section } = useStyles();
  return (
    <div>
      <Header />
      <section className={section}>
        <Sidebar />
        <ChatScreen />
      </section>
    </div>
  );
};
