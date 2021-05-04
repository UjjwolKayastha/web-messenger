import { auth, firestore } from "../../firebase";
import { authConstants } from "../constants";

export const signUp = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
    await auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log("DATA", data);
        const currentUser = auth.currentUser;
        const name = `${user.fullName}`;

        console.log("CURRENT USER", currentUser, name);
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            console.log("User updated.");
            firestore
              .collection("users")
              .add({
                name: user.fullName,
                email: user.email,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                const loggedInUser = {
                  name: user.fullName,
                  email: user.email,
                  uid: data.user.uid,
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("USER LOGGED IN SUCCESSFULLY");
                dispatch({
                  type: `${authConstants.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              });
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: { error: err },
        });
      });
  };
};

export const signIn = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
    await auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log("USER DATA", data);
        const loggedInUser = {
          name: data?.user?.displayName?.split(" ")[0],
          email: user.email,
          uid: data.user.uid,
        };
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        console.log("USER LOGGED IN SUCCESSFULLY");
        dispatch({
          type: `${authConstants.USER_LOGIN}_SUCCESS`,
          payload: { user: loggedInUser },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: `${authConstants.USER_LOGIN}_FAILURE`,
          payload: { error: err },
        });
      });
  };
};

export const isLoggedIn = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    console.log("kkkk", user);

    if (user) {
      dispatch({
        type: `${authConstants.USER_LOGIN}_SUCCESS`,
        payload: { user: user },
      });
    } else {
      dispatch({
        type: `${authConstants.USER_LOGIN}_FAILURE`,
        payload: { error: "Please Login" },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });

    await auth
      .signOut()
      .then(() => {
        localStorage.clear();
        dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS` });
        console.log("Logged out successfully");
      })
      .catch((e) => {
        dispatch({
          type: `${authConstants.USER_LOGOUT}_FAILURE`,
          payload: { e },
        });
        console.log(e);
      });
  };
};
