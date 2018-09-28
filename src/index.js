import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension";
import stripe from "tipsi-stripe";
import rootReducer from "./redux/rootReducer";
import Root from "./screens/Root";

axios.defaults.baseURL = "http://192.168.0.103:8000/api";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// stripe
stripe.setOptions({
  publishableKey: "pk_test_ZckC0nGYNKsbxdi80GHx9JTK",
});

const Index = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default Index;
