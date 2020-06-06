import { SET_LOCATION } from "../actions/locationActions";

const initState = {
  location: "Cambridge",
  latitude: 52.1999,
  longitude: 0.1216,  
  postcode: "CB2 1AG",
  locationError: null
};

const locationReducer = (state = initState, action) => {
  switch(action.type) {
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload.location,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        postcode: action.payload.postcode,
        locationError: null
      }
      break;
    case "LOCATION_ERROR":
        return {
          ...state,
          locationError: action.locationError
        }
        break;
    case "CLEAR_LOCATION_ERROR":
        return {
          ...state,
          locationError: null
        }
    default:
      return state;
  }
}

export default locationReducer;