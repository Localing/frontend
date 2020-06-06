import axios from "axios";
export const SET_LOCATION = "SET_LOCATION";
export const LOCATION_ERROR = "LOCATION_ERROR";
export const LOADING_LOCATION = "LOADING_LOCATION";
export const CLEAR_LOCATION_ERROR = "CLEAR_LOCATION_ERROR";

export const setLocation = postcode => {
  return dispatch => {
    dispatch({ type: LOADING_LOCATION })
    axios
      .get(`https://api.postcodes.io/postcodes/${postcode}`)
      .then(response => {
        let responseData = response.data.result;
        const location = responseData.parliamentary_constituency;
        const latitude = responseData.latitude;
        const longitude = responseData.longitude;
        dispatch({
          type: SET_LOCATION,
          payload: { location, latitude, longitude, postcode }
        });
      })
      .catch(err => {
        dispatch({
          type: LOCATION_ERROR,
          locationError: err
        })
      });
  };
};

export const clearLocationError = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_LOCATION_ERROR
    })
  }
}
