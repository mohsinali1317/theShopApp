import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/carts";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      var existingItem = state.items[addedProduct.id];
      let item;
      if (existingItem) {
        item = new CartItem(
          existingItem.quantity + 1,
          prodPrice,
          productTitle,
          prodPrice + existingItem.sum
        );
      } else {
        item = new CartItem(1, prodPrice, productTitle, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: item },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const currentItem = state.items[action.productId];
      let updatedItems;
      if (currentItem.quantity > 1) {
        const item = new CartItem(
          currentItem.quantity - 1,
          currentItem.productPrice,
          currentItem.productTitle,
          currentItem.sum - currentItem.productPrice
        );
        updatedItems = { ...state.items, [action.productId]: item };
      } else {
        updatedItems = { ...state.items };
        delete updatedItems[action.productId];
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: Math.abs(state.totalAmount - currentItem.productPrice),
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems1 = { ...state.items };
      const itemTotal = updatedItems1[action.pid].sum;
      delete updatedItems1[action.pid];
      return {
        ...state,
        items: updatedItems1,
        totalAmount: Math.abs(state.totalAmount - itemTotal),
      };

    default:
      return state;
  }
};
