import axios from "axios";
import {
  ADD_PRODUCT_TYPE_TO_CART,
  INCREMENT_CART_ITEM_COUNT,
  DECREMENT_CART_ITEM_COUNT,
  DELETE_ITEM_FROM_CART,
  RESET_CHECKOUT_ERROR,
  PAYMENT_LOADING,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
} from "./types";

/**
 * addProductTypeToCart actions
 */

const addProductTypeToCartSuccess = data => ({
  type: ADD_PRODUCT_TYPE_TO_CART,
  data,
});

export const addProductTypeToCart = productType => dispatch => {
  dispatch(addProductTypeToCartSuccess(productType));
};

/**
 * addProductTypeToCart actions
 */
const incrementCartItemSuccess = data => ({
  type: INCREMENT_CART_ITEM_COUNT,
  data,
});

export const incrementCartItem = uuid => dispatch => {
  dispatch(incrementCartItemSuccess(uuid));
};

/**
 * addProductTypeToCart actions
 */
const decrementCartItemSuccess = data => ({
  type: DECREMENT_CART_ITEM_COUNT,
  data,
});

export const decrementCartItem = uuid => dispatch => {
  dispatch(decrementCartItemSuccess(uuid));
};

/**
 * addProductTypeToCart actions
 */
const deleteItemFromCartSuccess = data => ({
  type: DELETE_ITEM_FROM_CART,
  data,
});

export const deleteItemFromCart = uuid => dispatch => {
  dispatch(deleteItemFromCartSuccess(uuid));
};

/**
 * Create Order
 */
const createOrderLoading = data => ({
  type: CREATE_ORDER_LOADING,
  data,
});

const createOrderSuccess = () => ({
  type: CREATE_ORDER_SUCCESS,
});

const createOrderFailed = data => ({
  type: CREATE_ORDER_FAILED,
  data,
});

export const createOrder = items => async dispatch => {
  dispatch(createOrderLoading(0));

  const cart = new FormData();

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];

    cart.append(`count[${i}]`, item.count);
    cart.append(`product_type_id[${i}]`, item.productType.id);

    item.photos.forEach(photo => {
      cart.append(`photos[${i}][]`, {
        uri: photo.node.image.uri,
        type: photo.node.type,
        name: "photo", // arbitary name
      });
    });
  }

  try {
    const config = {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
        dispatch(createOrderLoading(percentCompleted));
      },
    };

    await axios.post("order", cart, config);

    dispatch(createOrderSuccess());
  } catch (error) {
    const { message } = error.response.data;
    dispatch(createOrderFailed(message));
  }
};

/**
 * Payment
 */
const paymentLoading = () => ({
  type: PAYMENT_LOADING,
});

const paymentSuccess = () => ({
  type: PAYMENT_SUCCESS,
});

const paymentFailed = data => ({
  type: PAYMENT_FAILED,
  data,
});

export const payment = (total, items) => async dispatch => {
  dispatch(paymentLoading());

  try {
    await axios.post("payment", {
      total,
    });

    dispatch(paymentSuccess());
    dispatch(createOrder(items));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(paymentFailed(message));
  }
};

// RESET checkout error
const resetCheckoutErrorSuccess = () => ({
  type: RESET_CHECKOUT_ERROR,
});

export const resetCheckoutError = () => dispatch => {
  dispatch(resetCheckoutErrorSuccess());
};
