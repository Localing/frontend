import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
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
      case LOGIN_FAILURE:
        return {
          ...state,
          isLoggingIn: false,
          isAuthenticated: false,
          loginError: action.error
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
      case LOGOUT_FAILURE:
        return {
          ...state,
          isLoggingOut: false,
          logoutError: action.error
        };
      case SIGNUP_REQUEST:
        return {
          ...state,
          isSigningUp: true,
          signupError: null
        }
      case SIGNUP_SUCCESS:
        return {
          ...state,
          isSigningUp: false,
          signupError: null
        }
      case SIGNUP_FAILURE:
        return {
          ...state,
          isSigningUp: false,
          signupError: action.error
        }
      case VERIFY_REQUEST:
        return {
          ...state,
          isVerifying: true
        };
      case VERIFY_SUCCESS:
        return {
          ...state,
          isVerifying: false
        };
      default:
        return state;
    }
  };