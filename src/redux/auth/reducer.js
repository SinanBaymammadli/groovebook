import { combineReducers } from "redux";
import login from "./login";
import register from "./register";
import logout from "./logout";
import currentUser from "./currentUser";

export default combineReducers({
  currentUser,
  login,
  register,
  logout,
});
