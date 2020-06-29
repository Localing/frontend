import API from "../../services/API";

export const FETCH_BUSINESSES_BEGIN ="FETCH_BUSINESSES_BEGIN";
export const FETCH_BUSINESSES_SUCCESS = "FETCH_BUSINESSES_SUCCESS";
export const FETCH_BUSINESSES_ERROR = "FETCH_BUSINESSES_ERROR";

const fetchBusinessesSuccess = businesses => ({
  type: FETCH_BUSINESSES_SUCCESS,
  payload: businesses
});

const fetchBusinessesError = error => ({
  type: FETCH_BUSINESSES_ERROR,
  payload: error
});

const fetchBusinessesBegin = () => ({
  type: FETCH_BUSINESSES_BEGIN
});

// fetch businesses
export const fetchBusinesses = () => {
  return dispatch => {
    dispatch(fetchBusinessesBegin());
    API
      .get(`/business/`)
      .then(response => {
        dispatch(fetchBusinessesSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchBusinessesError(error));
      });  
  };
};
