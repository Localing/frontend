import axios from "axios";
export const SET_LOCATION = "SET_LOCATION";

export const setLocation = postcode => {
    return dispatch => {
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
          console.log("Error: ", err);
        });
    };
  };
  