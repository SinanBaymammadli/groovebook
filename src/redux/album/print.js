import { PRINT_ALBUM_LOADING, PRINT_ALBUM_SUCCESS, PRINT_ALBUM_FAILED } from "./types";

const initialState = {
  success: false,
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PRINT_ALBUM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PRINT_ALBUM_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: "",
      };
    case PRINT_ALBUM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
