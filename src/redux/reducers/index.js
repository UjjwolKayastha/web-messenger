import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { userReducer } from "./UserReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});
