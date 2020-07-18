import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CLEAR_LOGIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    CLEAR_LOGOUT_ERROR,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    CLEAR_SIGNUP_ERROR,
    VERIFY_REQUEST,
    VERIFY_SUCCESS
  } from "../actions/authActions";
  
  export default (
    state = {
      isLoggingIn: false,
      isLoggingOut: false,
      isSigningUp: false,
      isVerifying: false,
      loginError: null,
      logoutError: null,
      signupError: null,
      signupSuccess: false,
      isAuthenticated: false,
      user: {}
    },
    action
  ) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoggingIn: true,
          loginError: action.error
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggingIn: false,
          isAuthenticated: true,
          loginError: null,
          user: action.user
        };
      case LOGIN_ERROR:
        return {
          ...state,
          isLoggingIn: false,
          isAuthenticated: false,
          loginError: action.error
        };
      case CLEAR_LOGIN_ERROR:
        return {
          ...state,
          loginError: null
        };
      case LOGOUT_REQUEST:
        return {
          ...state,
          isLoggingOut: true,
          logoutError: action.error
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isLoggingOut: false,
          isAuthenticated: false,
          logoutError: null,
          user: {}
        };
      case LOGOUT_ERROR:
        return {
          ...state,
          isLoggingOut: false,
          logoutError: action.error
        };
      case CLEAR_LOGOUT_ERROR:
        return {
          ...state,
          logoutError: null
        };
      case SIGNUP_REQUEST:
        return {
          ...state,
          isSigningUp: true,
          signupError: null
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          isSigningUp: false,
          signupSuccess: true,
          signupError: null
        };
      case SIGNUP_ERROR:
        return {
          ...state,
          isSigningUp: false,
          signupSuccess: false,
          signupError: action.error
        };
      case CLEAR_SIGNUP_ERROR:
        return {
          ...state,
          signupError: null
        };
      case VERIFY_REQUEST:
        return {
          ...state,
          isVerifying: true
        };
      case VERIFY_SUCCESS:
        return {
          ...state,
          isVerifying: false,
          loginError: null,
          logoutError: null,
          signupError: null
        };
      default:
        return state;
    }
  };