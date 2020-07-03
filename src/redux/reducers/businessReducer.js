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
  business: null,
  fetchBusinessesError: null,
  fetchBusinessError: null
};

const businessReducer = (state = initState, action) => {
  if (action.type === FETCH_BUSINESSES_BEGIN) {
    return {
      ...state,
      fetchBusinessesError: null
    }
  }

  if (action.type === FETCH_BUSINESSES_SUCCESS) {
    return {
      ...state,
      businesses: action.payload,
      fetchBusinessesError: null
    };
  }

  if (action.type === FETCH_BUSINESSES_ERROR) {
    return {
      ...state,
      fetchBusinessesError: action.payload
    }
  }

  if (action.type === FETCH_BUSINESS_BEGIN) {
    // clear out old business details
    return {
      ...state,
      business: null,
      fetchBusinessError: null
    }
  }

  if (action.type === FETCH_BUSINESS_SUCCESS) {
    return {
      ...state,
      business: action.payload,
      fetchBusinessError: null
    };
  }

  if (action.type === FETCH_BUSINESS_ERROR) {
    return {
      ...state,
      fetchBusinessError: action.payload
    }
  }

  if (action.type === CLEAR_BUSINESS){
    return {
      ...state,
      business: null,
      fetchBusinessError: null
    }
  }

  return state;
};

export default businessReducer;
