import { SET_LOCATION } from "../actions/locationActions";

const initState = {
  location: "Cambridge, UK"
};

const locationReducer = (state = initState, action) => {
  if (action.type === SET_LOCATION) {
    const location = action.payload.location;
    return {
      ...state,
      location
    }
  }
  return state;
}

export default locationReducer;