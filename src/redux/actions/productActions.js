import API from "../../services/API";

// actions to get a list of products by business

export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";

const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

const fetchProductsError = error => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: error
})

// fetch products
export const fetchProducts = (businessID) => {
  return dispatch => {
    dispatch(fetchProductsBegin());
    API
      .get(`/business/${businessID}/product`)
      .then(response => {
        const activeProducts = response.data.filter(product => product.active);
        dispatch(fetchProductsSuccess(activeProducts));
      })
      .catch(err => {
        fetchProductsError(err);
      });
  };
};

// clear products from state
export const clearProducts = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PRODUCTS
    })
  }
}

// actions to get details of a single product

export const FETCH_PRODUCT_BEGIN = "FETCH_PRODUCT_BEGIN";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_ERROR = "FETCH_PRODUCT_ERROR";
export const CLEAR_PRODUCT = "CLEAR_PRODUCT";

const fetchProductBegin = () => ({
  type: FETCH_PRODUCT_BEGIN
});

const fetchProductSuccess = product => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product
});

const fetchProductError = error => ({
  type: FETCH_PRODUCT_ERROR,
  payload: error
})

// fetch product details
export const fetchProduct = (businessId, productId) => {
  return dispatch => {
    dispatch(fetchProductBegin());
    API
      .get(`/business/${businessId}/product/${productId}`)
      .then(response => {
        const product = response.data;
        if (product.active){
          dispatch(fetchProductSuccess(product));
        } else {
          fetchProductError({ message: "This product is not active."});
        }
      })
      .catch(err => {
        fetchProductError(err);
      });
  };
};

// clear product from state
export const clearProduct = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PRODUCT
    })
  }
}