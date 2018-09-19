import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILED } from "./types";

const initialState = {
  success: false,
  loading: false,
  error: {
    message: "",
    errors: {},
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: {
          message: "",
          errors: {},
        },
      };
    case LOGIN_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
