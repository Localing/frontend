import API from "../../services/API";

// actions for fetching the list of businesses

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

// actions for fetching details of a single business

export const FETCH_BUSINESS_BEGIN = "FETCH_BUSINESS_BEGIN";
export const FETCH_BUSINESS_SUCCESS = "FETCH_BUSINESS_SUCCESS";
export const FETCH_BUSINESS_ERROR = "FETCH_BUSINESS_ERROR";
export const CLEAR_BUSINESS = "CLEAR_BUSINESS";

const fetchBusinessSuccess = business => ({
  type: FETCH_BUSINESS_SUCCESS,
  payload: business
});

const fetchBusinessError = error => ({
  type: FETCH_BUSINESS_ERROR,
  payload: error
});

const fetchBusinessBegin = () => ({
  type: FETCH_BUSINESS_BEGIN
});

export const fetchBusiness = (businessId) => {
  return dispatch => {
    dispatch(fetchBusinessBegin());
    API
      .get(`/business/${businessId}`)
      .then(response => {
        dispatch(fetchBusinessSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchBusinessError(error));
      });  
  };
};

export const clearBusiness = () => {
  return dispatch => {
    dispatch({ type: CLEAR_BUSINESS })
  }
}
