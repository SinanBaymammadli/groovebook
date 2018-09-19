import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth/reducer";
import product from "./product/reducer";
import album from "./album/reducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  product,
  album,
});

export default rootReducer;
