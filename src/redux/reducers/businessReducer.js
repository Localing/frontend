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
  isFetching: false,
  fetchBusinessesError: null,
  fetchBusinessError: null
};

const businessReducer = (state = initState, action) => {
  if (action.type === FETCH_BUSINESSES_BEGIN) {
    return {
      ...state,
      isFetching: true,
      fetchBusinessesError: null
    }
  }

  if (action.type === FETCH_BUSINESSES_SUCCESS) {
    return {
      ...state,
      businesses: action.payload,
      isFetching: false,
      fetchBusinessesError: null
    };
  }

  if (action.type === FETCH_BUSINESSES_ERROR) {
    return {
      ...state,
      isFetching: false,
      fetchBusinessesError: action.payload
    }
  }

  if (action.type === FETCH_BUSINESS_BEGIN) {
    return {
      ...state,
      business: null,
      isFetching: true,
      fetchBusinessError: null
    }
  }

  if (action.type === FETCH_BUSINESS_SUCCESS) {
    return {
      ...state,
      business: action.payload,
      isFetching: false,
      fetchBusinessError: null
    };
  }

  if (action.type === FETCH_BUSINESS_ERROR) {
    return {
      ...state,
      isFetching: false,
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
