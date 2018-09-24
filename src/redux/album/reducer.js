import { combineReducers } from "redux";
import albums from "./albums";
import create from "./create";
import update from "./update";
import setting from "./setting";
import print from "./print";

export default combineReducers({
  albums,
  create,
  update,
  print,
  setting,
});
