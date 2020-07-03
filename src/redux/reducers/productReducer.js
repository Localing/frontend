import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from "../actions/productActions";

const initState = {
  products: [],
  fetchProductsSuccess: false,
  error: null
};

const productReducer = (state = initState, action) => {

  if (action.type === FETCH_PRODUCTS_BEGIN) {
    return {
      ...initState
    }
  }

  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products: action.payload,
      fetchProductsSuccess: true,
      error: null
    };
  }

  if (action.type === FETCH_PRODUCTS_ERROR) {
    return {
      ...state,
      products: [],
      fetchProductsSuccess: false,
      error: action.payload
    }
  }

  return state;
};

export default productReducer;
