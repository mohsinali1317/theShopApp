import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/carts";

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
    default:
      return state;
  }
};
