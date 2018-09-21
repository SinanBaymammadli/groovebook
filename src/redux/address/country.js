import { GET_COUNTRIES_LOADING, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_FAILED } from "./types";

const initialState = {
  countries: [],
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_COUNTRIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.data,
        loading: false,
        error: "",
      };
    case GET_COUNTRIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
