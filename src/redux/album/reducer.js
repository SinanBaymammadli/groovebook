import { combineReducers } from "redux";
import albums from "./albums";
import create from "./create";

export default combineReducers({
  albums,
  create,
});
