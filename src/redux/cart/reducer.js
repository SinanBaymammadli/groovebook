import { combineReducers } from "redux";
import checkout from "./checkout";
import items from "./items";
import payment from "./payment";

export default combineReducers({
  items,
  checkout,
  payment,
});
