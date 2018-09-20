import { REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_FAILED } from "./types";
import { REGISTER_SUCCESS_MESSAGE } from "../../constants";

const initialState = {
  success: false,
  loading: false,
  message: "",
  error: {
    message: "",
    errors: {},
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        success: true,
        loading: false,
        message: REGISTER_SUCCESS_MESSAGE,
        error: {
          message: "",
          errors: {},
        },
      };
    case REGISTER_FAILED:
      return {
        success: false,
        loading: false,
        message: "",
        error: action.data,
      };
    default:
      return state;
  }
};
