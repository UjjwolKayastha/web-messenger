import { makeStyles } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../AuthContext";
import { ChatScreen, Header, SideBarUsers } from "../components";
import { getRealTimeUsers, getRealtimeConversations } from "../redux";

const useStyles = makeStyles({
  container: {
    display: "flex",
    position: "fixed",
    width: "100%",
    height: "calc(100% - 60px)",
    overflow: "hidden",
    marginTop: 60,
  },
  listOfUsers: {
    height: "100%",
    overflowX: "hidden",
    borderRight: "1px solid #ccc",
    flex: 1,
  },
});

export const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const { setChatStarted, setChatUser, setUserUid } = useContext(AuthContext);

  let unsubscribe;

  // console.log("USER FROM SELCTOR HOME", user);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribe = dispatch(getRealTimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.name}`);
    setUserUid(user.uid);

    console.log(user);

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <section className={classes.container}>
        <div className={classes.listOfUsers}>
          {user.users.length > 0
            ? user.users.map((user) => {
                return (
                  <SideBarUsers onClick={initChat} key={user.uid} user={user} />
                );
              })
            : null}
        </div>
        <ChatScreen />
      </section>
    </div>
  );
};
