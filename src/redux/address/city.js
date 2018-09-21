import { GET_CITIES_LOADING, GET_CITIES_SUCCESS, GET_CITIES_FAILED } from "./types";

const initialState = {
  cities: [],
  loading: false,
  error: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CITIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.data,
        loading: false,
        error: "",
      };
    case GET_CITIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};
