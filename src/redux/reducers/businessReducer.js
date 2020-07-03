import {
  FETCH_BUSINESSES_BEGIN,
  FETCH_BUSINESSES_SUCCESS,
  FETCH_BUSINESSES_ERROR,
  FETCH_BUSINESS_BEGIN,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_ERROR,
  CLEAR_BUSINESS
} from "../actions/businessActions";


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

  if (action.type === FETCH_BUSINESS_BEGIN) {
    // clear out old business details
    return initState
  }

  if (action.type === FETCH_BUSINESS_SUCCESS) {
    return {
      ...state,
      business: action.payload,
      fetchBusinessSuccess: true,
      error: null
    };
  }

  if (action.type === FETCH_BUSINESS_ERROR) {
    return {
      ...state,
      fetchBusinessSuccess: false,
      error: action.payload
    }
  }

  if (action.type === CLEAR_BUSINESS){
    return initState
  }

  return state;
};

export default businessReducer;
