import axios from "axios";
import {
  GET_COUNTRIES_LOADING,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILED,
  GET_CITIES_LOADING,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAILED,
} from "./types";

/**
 * getCountries
 */
const getCountriesLoading = () => ({
  type: GET_COUNTRIES_LOADING,
});

const getCountriesSuccess = data => ({
  type: GET_COUNTRIES_SUCCESS,
  data,
});

const getCountriesFailed = data => ({
  type: GET_COUNTRIES_FAILED,
  data,
});

export const getCountries = () => async dispatch => {
  dispatch(getCountriesLoading());
  try {
    const response = await axios.get("country");
    const { data } = response;

    const countries = data.map(country => ({
      value: country.id.toString(),
      label: country.name,
    }));

    dispatch(getCountriesSuccess(countries));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(getCountriesFailed(message));
  }
};

/**
 * getCities
 */
const getCitiesLoading = () => ({
  type: GET_CITIES_LOADING,
});

const getCitiesSuccess = data => ({
  type: GET_CITIES_SUCCESS,
  data,
});

const getCitiesFailed = data => ({
  type: GET_CITIES_FAILED,
  data,
});

export const getCities = countryId => async dispatch => {
  dispatch(getCitiesLoading());
  try {
    const response = await axios.get("city", {
      params: {
        country_id: countryId,
      },
    });
    const { data } = response;

    const cities = data.map(city => ({
      value: city.id.toString(),
      label: city.name,
    }));

    dispatch(getCitiesSuccess(cities));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(getCitiesFailed(message));
  }
};
