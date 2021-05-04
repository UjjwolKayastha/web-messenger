import { authConstants } from "../constants";

const initialState = {
  fullName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  console.log("FROM AUTH REDUCER", action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case `${authConstants.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case `${authConstants.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;
    case `${authConstants.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;
    case `${authConstants.USER_LOGOUT}_REQUEST`:
      break;
    case `${authConstants.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initialState,
      };
      break;
    case `${authConstants.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
