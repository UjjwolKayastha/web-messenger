import { makeStyles, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../AuthContext";
import { updateMessage } from "../../redux";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  container: {
    flex: 4,
    overflowX: "hidden",
  },
  title: {
    background: "#e2e0e1",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  chatControls: {
    display: "flex",
    position: "fixed",
    background: "white",
    height: 50,
    bottom: 0,
    width: "100%",
    overflow: "hidden",
    "& .textInput": {
      width: "75%",
    },
    "& .sendButton": {
      width: "10%",
    },
  },
  messageSection: {
    height: "calc(100% - 98px)",
    width: "100%",
    overflowX: "hidden",
    position: "relative",
    top: 0,
    padding: "0px 10px",
  },
  messageStyle: {
    background: "skyblue",
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: 10,
    margin: 5,
  },
});

export const ChatScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");

  const { chatStarted, chatUser, userUid } = useContext(AuthContext);

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== "") {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage("");
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>{chatStarted ? chatUser : ""}</div>
      {chatStarted ? (
        <div className={classes.messageSection}>
          {user.conversations.map((con) => (
            <div
              style={{
                textAlign: con.user_uid_1 === auth.uid ? "right" : "left",
              }}
            >
              <p className={classes.messageStyle}>{con.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", width: "auto", height: "auto" }}>
          <img src="https://picsum.photos/seed/picsum/1920/800" alt="welcome" />
        </div>
      )}
      {chatStarted ? (
        <div className={classes.chatControls}>
          <TextField
            className="textInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write Message"
            multiline
            rows={4}
            variant="outlined"
          />
          <IconButton
            className="sendButtom"
            variant="contained"
            color="primary"
            onClick={submitMessage}
          >
            <SendIcon />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};
