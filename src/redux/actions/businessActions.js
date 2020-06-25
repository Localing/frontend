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
      .get(`https://tempimage.dev.localing.co.uk/businesses.json`)
      .then(response => {
        dispatch(fetchBusinessesSuccess(response));
      })
      .catch(err => {
        console.log(err);
      });  
  };
};
