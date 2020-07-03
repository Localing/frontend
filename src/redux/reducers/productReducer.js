import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CLEAR_PRODUCTS,
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  CLEAR_PRODUCT
} from "../actions/productActions";

const initState = {
  products: [],
  product: null,
  fetchProductsError: null,
  fetchProductError: null
};

const productReducer = (state = initState, action) => {

  if (action.type === FETCH_PRODUCTS_BEGIN) {
    return {
      ...state,
      products: [],
      fetchProductsSuccess: false,
    }
  }

  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products: action.payload,
      fetchProductsError: null
    };
  }

  if (action.type === FETCH_PRODUCTS_ERROR) {
    return {
      ...state,
      fetchProductsError: action.payload
    }
  }

  if (action.type === CLEAR_PRODUCTS){
    return {
      ...state,
      products: [],
      fetchProductsError: null
    }
  }


  if (action.type === FETCH_PRODUCT_BEGIN) {
    return {
      ...state,
      product: null,
      fetchProductError: null
    }
  }

  if (action.type === FETCH_PRODUCT_SUCCESS) {
    return {
      ...state,
      product: action.payload,
      fetchProductError: null
    };
  }

  if (action.type === FETCH_PRODUCT_ERROR) {
    return {
      ...state,
      fetchProductError: action.payload
    }
  }

  if (action.type === CLEAR_PRODUCT){
    return {
      ...state,
      product: null,
      fetchProductError: null
    }
  }

  return state;
};

export default productReducer;
