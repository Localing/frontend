import { ADD_TO_COMPARE, DELETE_FROM_COMPARE } from "../actions/compareActions";

const initState = [];

const compareReducer = (state = initState, action) => {
  const compareItems = state,
    product = action.payload;

  if (action.type === ADD_TO_COMPARE) {
    const compareItem = compareItems.filter(item => item.productId === product.productId)[0];
    if (compareItem === undefined) {
      return [...compareItems, product];
    } else {
      return compareItems;
    }
  }

  if (action.type === DELETE_FROM_COMPARE) {
    const remainingItems = (compareItems, product) =>
      compareItems.filter(compareItem => compareItem.productId !== product.productId);
    return remainingItems(compareItems, product);
  }

  return compareItems;
};

export default compareReducer;
