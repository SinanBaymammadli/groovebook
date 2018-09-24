import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth/reducer";
import product from "./product/reducer";
import album from "./album/reducer";
import address from "./address/reducer";
import cart from "./cart/reducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  product,
  album,
  address,
  cart,
});

export default rootReducer;
