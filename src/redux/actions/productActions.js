import axios from "axios";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

// fetch products
export const fetchProducts = () => {
  return dispatch => {
    axios
      .get(`https://tempimage.dev.localing.co.uk/products.json`)
      .then(response => {
        dispatch(fetchProductsSuccess(response));
      })
      .catch(err => {
        console.log(err);
      });  
  };
};

