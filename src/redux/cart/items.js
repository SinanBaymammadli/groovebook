import {
  ADD_PRODUCT_TYPE_TO_CART,
  INCREMENT_CART_ITEM_COUNT,
  DECREMENT_CART_ITEM_COUNT,
  DELETE_ITEM_FROM_CART,
  CREATE_ORDER_SUCCESS,
} from "./types";

const initialState = {
  items: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_PRODUCT_TYPE_TO_CART:
      return {
        items: [...state.items, action.data],
      };
    case INCREMENT_CART_ITEM_COUNT:
      return {
        items: state.items.map(item => {
          if (item.uuid !== action.data) return item;
          return {
            ...item,
            count: item.count + 1,
          };
        }),
      };
    case DECREMENT_CART_ITEM_COUNT:
      return {
        items: state.items.map(item => {
          if (item.uuid !== action.data) return item;
          return {
            ...item,
            count: item.count > 1 ? item.count - 1 : 1,
          };
        }),
      };
    case DELETE_ITEM_FROM_CART:
      return {
        items: state.items.filter(item => item.uuid !== action.data),
      };
    case CREATE_ORDER_SUCCESS:
      return {
        items: [],
      };
    default:
      return state;
  }
};
