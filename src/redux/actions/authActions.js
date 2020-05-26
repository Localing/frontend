import { Auth, Hub } from 'aws-amplify';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = (error) => {
  return {
    type: LOGIN_FAILURE,
    error
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const recieveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};


const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};


const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

export const loginUser = (email, password) => async dispatch => {
  dispatch(requestLogin());
  try {
    const user = await Auth.signIn(email, password);
    dispatch(receiveLogin(user));
    console.log(user);
  } catch (err) {
    console.log(err);
    dispatch(loginError(err))
  }
};

export const logoutUser = () => async dispatch => {
  dispatch(requestLogout());
  try {
    await Auth.signOut();
    dispatch(recieveLogout());
  } catch(err){
    console.log(err);
    dispatch(logoutError());
  }
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  Hub.listen('auth', (data) => {
    switch(data.payload.event){
      case 'signIn':
        const user = data.payload.data
        dispatch(receiveLogin(user));
        console.log(user);
      case 'signIn_failure':
          console.log("error: ", data.payload.data)
    }
    dispatch(verifySuccess());
  })
};