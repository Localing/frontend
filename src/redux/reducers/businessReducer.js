import { FETCH_BUSINESSES_SUCCESS } from "../actions/businessActions";

const initState = {
  businesses: [],
  fetchBusinessesSuccess: false
};

const businessReducer = (state = initState, action) => {
  if (action.type === FETCH_BUSINESSES_SUCCESS) {
    return {
      ...state,
      businesses: action.payload,
      fetchBusinessesSuccess: true
    };
  }

  return state;
};

export default businessReducer;
