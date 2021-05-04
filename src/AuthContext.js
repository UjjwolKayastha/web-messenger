import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [userUid, setUserUid] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        chatStarted,
        setChatStarted,
        chatUser,
        setChatUser,
        userUid,
        setUserUid,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
