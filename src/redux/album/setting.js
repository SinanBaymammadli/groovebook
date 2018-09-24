import {
  GET_ALBUM_SETTINGS_LOADING,
  GET_ALBUM_SETTINGS_SUCCESS,
  GET_ALBUM_SETTINGS_FAILED,
} from "./types";

const initialState = {
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ALBUM_SETTINGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALBUM_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.data,
        loading: false,
        error: "",
      };
    case GET_ALBUM_SETTINGS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
