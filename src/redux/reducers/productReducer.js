import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CLEAR_PRODUCTS
} from "../actions/productActions";

const initState = {
  products: [],
  fetchProductsSuccess: false,
  error: null
};

const productReducer = (state = initState, action) => {

  if (action.type === FETCH_PRODUCTS_BEGIN) {
    // clear out any old products before fetching
    return initState
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
      fetchProductsSuccess: false,
      error: action.payload
    }
  }

  if (action.type === CLEAR_PRODUCTS){
    return initState;
  }

  return state;
};

export default productReducer;
