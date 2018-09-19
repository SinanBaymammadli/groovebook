import axios from "axios";
import {
  GET_CATEGORIES_LOADING,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
} from "./types";

/**
 * getCategories
 */
const getCategoriesLoading = () => ({
  type: GET_CATEGORIES_LOADING,
});

const getCategoriesSuccess = data => ({
  type: GET_CATEGORIES_SUCCESS,
  data,
});

const getCategoriesFailed = data => ({
  type: GET_CATEGORIES_FAILED,
  data,
});

export const getCategories = () => async dispatch => {
  dispatch(getCategoriesLoading());
  try {
    const response = await axios.get("category");
    const { data } = response;

    dispatch(getCategoriesSuccess(data));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(getCategoriesFailed(message));
  }
};

/**
 * getProducts
 */
const getProductsLoading = () => ({
  type: GET_PRODUCTS_LOADING,
});

const getProductsSuccess = data => ({
  type: GET_PRODUCTS_SUCCESS,
  data,
});

const getProductsFailed = data => ({
  type: GET_PRODUCTS_FAILED,
  data,
});

export const getProducts = categoryId => async dispatch => {
  dispatch(getProductsLoading());
  try {
    const response = await axios.get("product", {
      params: {
        category_id: categoryId,
      },
    });
    const { data } = response;

    dispatch(getProductsSuccess(data));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(getProductsFailed(message));
  }
};
