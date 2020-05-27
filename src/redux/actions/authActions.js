import { Auth, Hub } from 'aws-amplify';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

export const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  };
};

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

export const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_FAILURE,
    error
  };
};


export const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};


export const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

export const loginUser = (email, password) => async dispatch => {
  dispatch(requestLogin());
  try {
    const user = await Auth.signIn(email, password);
    dispatch(receiveLogin(user));
  } catch (err) {
    dispatch(loginError(err))
  }
};

export const logoutUser = () => async dispatch => {
  dispatch(requestLogout());
  try {
    await Auth.signOut();
    dispatch(receiveLogout());
  } catch (err) {
    console.log(err);
    dispatch(logoutError(err));
  }
};

export const verifyAuth = () => async dispatch => {
  dispatch(verifyRequest());

  // check if a user exists, or clear the user if not
  Auth.currentAuthenticatedUser()
  .then(user =>{ 
    dispatch(receiveLogin(user))
    dispatch(verifySuccess());
  })
  .catch(err =>{ 
    dispatch(receiveLogout())
  })
};