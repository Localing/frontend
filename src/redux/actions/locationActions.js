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
        const location = responseData.admin_ward;
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

export const setLocationByCoords = (lat, lon) => {
  return dispatch => {
    dispatch({ type: LOADING_LOCATION })
    axios
      .get(`https://api.postcodes.io/postcodes?lon=${lon}&lat=${lat}`)
      .then(response => {
        let responseData = response.data.result;

        if (responseData) {

          // if multiple cities are matched, use the closest
          if (responseData.length > 1) {
            responseData = responseData.shift();
          }

          const location = responseData.admin_ward;
          const postcode = responseData.postcode;

          dispatch({
            type: SET_LOCATION,
            payload: { location, latitude: lat, longitude: lon, postcode }
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const clearLocationError = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_LOCATION_ERROR
    })
  }
}
