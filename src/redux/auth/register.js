import { REGISTER_LOADING, REGISTER_SUCCESS, REGISTER_FAILED } from "./types";
import { REGISTER_SUCCESS_MESSAGE } from "../../constants";

const initialState = {
  success: false,
  loading: false,
  error: "",
  message: "",
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
        error: "",
        message: REGISTER_SUCCESS_MESSAGE,
      };
    case REGISTER_FAILED:
      return {
        success: false,
        loading: false,
        error: action.data,
        message: "",
      };
    default:
      return state;
  }
};
