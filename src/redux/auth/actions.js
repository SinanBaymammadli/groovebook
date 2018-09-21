import axios from "axios";
import { AsyncStorage } from "react-native";
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  GET_AUTH_INFO_LOADING,
  GET_AUTH_INFO_SUCCESS,
  GET_AUTH_INFO_FAILED,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "./types";
import { USER_TOKEN } from "../../constants";

/**
 * Login actions
 */
const loginLoading = () => ({
  type: LOGIN_LOADING,
});

const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  data,
});

const loginFailed = data => ({
  type: LOGIN_FAILED,
  data,
});

/**
 * Login actionCreator
 */
export const login = credentials => async dispatch => {
  dispatch(loginLoading());
  try {
    const response = await axios.post("auth/login", credentials);
    const { data } = response;

    await AsyncStorage.setItem(USER_TOKEN, data.access_token);
    axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    dispatch(loginSuccess(data.access_token));
  } catch (error) {
    const { data } = error.response;
    dispatch(loginFailed(data));
  }
};

/**
 * Register actions
 */
const registerLoading = () => ({
  type: REGISTER_LOADING,
});

const registerSuccess = message => ({
  type: REGISTER_SUCCESS,
  data: message,
});

const registerFailed = data => ({
  type: REGISTER_FAILED,
  data,
});

/**
 * Register actionCreator
 */
export const register = credentials => async dispatch => {
  dispatch(registerLoading());

  console.log(credentials);

  try {
    const response = await axios.post("auth/register", credentials);
    const { message } = response.data;
    console.log(response.data);
    dispatch(registerSuccess(message));
  } catch (error) {
    const { data } = error.response;
    console.log(data);
    dispatch(registerFailed(data));
  }
};

/**
 * Logout actions
 */
const logoutLoading = () => ({
  type: LOGOUT_LOADING,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailed = data => ({
  type: LOGOUT_FAILED,
  data,
});

/**
 * Logout actionCreator
 */
export const logout = () => async dispatch => {
  dispatch(logoutLoading());

  try {
    await axios.post("/auth/logout");
    await AsyncStorage.removeItem(USER_TOKEN);
    dispatch(logoutSuccess());
  } catch (error) {
    const { message } = error.response.data;
    dispatch(logoutFailed(message));
  }
};

/**
 * Get Current User Info actions
 */
const getAuthInfoLoading = () => ({
  type: GET_AUTH_INFO_LOADING,
});

const getAuthInfoSuccess = data => ({
  type: GET_AUTH_INFO_SUCCESS,
  data,
});

const getAuthInfoFailed = data => ({
  type: GET_AUTH_INFO_FAILED,
  data,
});

/**
 * Get Current User Info actionCreator
 */
export const getAuthInfo = () => async dispatch => {
  dispatch(getAuthInfoLoading());

  try {
    const response = await axios.post("/auth/me");
    const { data } = response;

    dispatch(getAuthInfoSuccess(data));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(getAuthInfoFailed(message));
  }
};
