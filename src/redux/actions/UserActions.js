import { firestore } from "../../firebase";
import { userConstants } from "../constants";

export const getRealTimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

    const unSubscribe = firestore
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().uid !== uid) {
            users.push(doc.data());
          }
        });
        // console.log(users);
        dispatch({
          type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users },
        });
      });
    return unSubscribe;
  };
};

export const updateMessage = (msgObj) => {
  return async (dispatch) => {
    firestore
      .collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        console.log(data);
        //success
        // dispatch({
        //     type: userConstants.GET_REALTIME_MESSAGES,
        // })
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    firestore
      .collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations = [];

        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === user.uid_1 &&
              doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 &&
              doc.data().user_uid_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
          }

          // if(conversations.length > 0){

          // }else{
          //     dispatch({
          //         type: `${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
          //         payload: { conversations }
          //     })
          // }
        });

        dispatch({
          type: userConstants.GET_REALTIME_MESSAGES,
          payload: { conversations },
        });

        console.log("CONVERSSAITNOTOANTOANTOA", conversations);
      });
    //user_uid_1 == 'myid' and user_uid_2 = 'yourId' OR user_uid_1 = 'yourId' and user_uid_2 = 'myId'
  };
};
