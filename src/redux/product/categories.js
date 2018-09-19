import { GET_CATEGORIES_LOADING, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILED } from "./types";

const initialState = {
  categories: [],
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CATEGORIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.data,
        loading: false,
        error: "",
      };
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
