import { LOGOUT_LOADING, LOGOUT_SUCCESS, LOGOUT_FAILED } from "./types";

const initialState = {
  success: false,
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGOUT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        success: true,
        loading: false,
        error: "",
      };
    case LOGOUT_FAILED:
      return {
        success: false,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
