import {
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_CHECKOUT_ERROR,
} from "./types";

const initialState = {
  succes: false,
  loading: false,
  uploadedPercent: 0,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_ORDER_LOADING:
      return {
        ...state,
        loading: true,
        uploadedPercent: action.data,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        succes: true,
        loading: false,
        error: "",
      };
    case CREATE_ORDER_FAILED:
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
