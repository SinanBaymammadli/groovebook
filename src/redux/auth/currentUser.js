import { LOGIN_SUCCESS, GET_AUTH_INFO_SUCCESS, LOGOUT_SUCCESS } from "./types";

const initialState = {
  success: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case GET_AUTH_INFO_SUCCESS:
      return {
        ...state,
        ...action.data,
        success: true,
      };
    case LOGOUT_SUCCESS:
      return {
        success: false,
      };
    default:
      return state;
  }
};
