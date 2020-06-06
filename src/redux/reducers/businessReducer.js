import { FETCH_BUSINESSES_SUCCESS } from "../actions/businessActions";

const initState = {
  businesses: []
};

const businessReducer = (state = initState, action) => {
  if (action.type === FETCH_BUSINESSES_SUCCESS) {
    return {
      ...state,
      businesses: action.payload
    };
  }

  return state;
};

export default businessReducer;
