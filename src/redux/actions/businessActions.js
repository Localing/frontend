export const FETCH_BUSINESSES_SUCCESS = "FETCH_BUSINESSES_SUCCESS";

const fetchBusinessesSuccess = businesses => ({
  type: FETCH_BUSINESSES_SUCCESS,
  payload: businesses
});

// fetch products
export const fetchBusinesses = businesses => {
  return dispatch => {
    dispatch(fetchBusinessesSuccess(businesses));
  };
};
