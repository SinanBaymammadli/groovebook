import { UPDATE_ALBUM_LOADING, UPDATE_ALBUM_SUCCESS, UPDATE_ALBUM_FAILED } from "./types";

const initialState = {
  success: false,
  loading: false,
  uploadedPercent: 0,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_ALBUM_LOADING:
      return {
        ...state,
        loading: true,
        uploadedPercent: action.data,
      };
    case UPDATE_ALBUM_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: "",
      };
    case UPDATE_ALBUM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
