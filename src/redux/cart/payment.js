import { PAYMENT_LOADING, PAYMENT_SUCCESS, PAYMENT_FAILED, RESET_CHECKOUT_ERROR } from "./types";

const initialState = {
  succes: false,
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PAYMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        succes: true,
        loading: false,
        error: "",
      };
    case PAYMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    case RESET_CHECKOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};
