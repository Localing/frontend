import { FETCH_BUSINESSES_BEGIN, FETCH_BUSINESSES_SUCCESS, FETCH_BUSINESSES_ERROR } from "../actions/businessActions";


const initState = {
  businesses: [],
  fetchBusinessesSuccess: false,
  error: null
};

const businessReducer = (state = initState, action) => {
  if (action.type === FETCH_BUSINESSES_BEGIN) {
    return {
      ...state,
      fetchBusinessesSuccess: false,
      error: null
    }
  }

  if (action.type === FETCH_BUSINESSES_SUCCESS) {
    return {
      ...state,
      businesses: action.payload,
      fetchBusinessesSuccess: true,
      error: null
    };
  }

  if (action.type === FETCH_BUSINESSES_ERROR) {
    return {
      ...state,
      fetchBusinessesSuccess: false,
      error: action.payload
    }
  }

  return state;
};

export default businessReducer;
