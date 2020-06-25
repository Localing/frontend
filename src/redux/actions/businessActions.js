import axios from "axios";

export const FETCH_BUSINESSES_SUCCESS = "FETCH_BUSINESSES_SUCCESS";

const fetchBusinessesSuccess = businesses => ({
  type: FETCH_BUSINESSES_SUCCESS,
  payload: businesses
});

// fetch businesses
export const fetchBusinesses = () => {
  return dispatch => {
    axios
      .get(`https://consumerapi.dev.localing.co.uk/business/`)
      .then(response => {
        console.log(response.data);
        dispatch(fetchBusinessesSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
      });  
  };
};
