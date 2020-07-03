import API from "../../services/API";

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
        dispatch(fetchProductsSuccess(response.data));
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