import { makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";

const useStyles = makeStyles({
  container: {
    flex: 1,
    borderRight: "1px solid grey",
  },
  name: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 10px",
  },
  displayName: {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    boxSizing: "border-box",
    cursor: "pointer",
    "& .displayPic": {
      width: "50px",
      height: "50px",
      overflow: "hidden",
      borderRadius: "25px",
    },
    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  onlineStatus: {
    display: "inline-block",
    width: 10,
    height: 10,
    background: "#16e316",
    borderRadius: 5,
    boxShadow: "0 0 10px 0 #16e316",
  },
  offlineStatus: {
    background: "green",
    width: 10,
    height: 10,
    boxShadow: "0 0 0 0",
    borderRadius: 5,
  },
});

export const SideBarUsers = ({ user, onClick }) => {
  const classes = useStyles();

  return (
    <div onClick={() => onClick(user)} className={classes.displayName}>
      <div className="displayPic">
        <img
          src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
          alt={user.name}
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          margin: "0 10px",
        }}
      >
        <span style={{ fontWeight: 500 }}>{user.name}</span>
        <span
          className={
            user.isOnline ? classes.onlineStatus : classes.offlineStatus
          }
        ></span>
      </div>
    </div>
  );
};
