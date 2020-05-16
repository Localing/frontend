import { SET_LOCATION } from "../actions/locationActions";

const initState = {
  location: "Cambridge, UK",
  latitude: 52.1999,
  longitude: 0.1216,  
  postcode: "CB2 1AG"
};

const locationReducer = (state = initState, action) => {
  if (action.type === SET_LOCATION) {
    return {
      ...state,
      location: action.payload.location,
      latitude: action.payload.latitude,
      longitude: action.payload.longitude,
      postcode: action.payload.postcode
    }
  }
  return state;
}

export default locationReducer;