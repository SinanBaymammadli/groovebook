import { GET_ALBUMS_LOADING, GET_ALBUMS_SUCCESS, GET_ALBUMS_FAILED } from "./types";

const initialState = {
  albums: [],
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ALBUMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.data,
        loading: false,
        error: "",
      };
    case GET_ALBUMS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
