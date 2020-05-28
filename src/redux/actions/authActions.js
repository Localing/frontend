import { Auth } from 'aws-amplify';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

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

export const receiveLoginError = (error) => {
  return {
    type: LOGIN_ERROR,
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

export const receiveLogoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    error
  };
};

export const requestSignUp = () => {
  return {
    type: SIGNUP_REQUEST
  }
}

export const receiveSignUp = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    user
  }
}

export const receiveSignUpError = (error) => {
  return {
    type: SIGNUP_ERROR,
    error
  }
}

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
    dispatch(receiveLoginError(err))
  }
};

export const logoutUser = () => async dispatch => {
  dispatch(requestLogout());
  try {
    await Auth.signOut();
    dispatch(receiveLogout());
  } catch (err) {
    console.log(err);
    dispatch(receiveLogoutError(err));
  }
};

export const signUpUser = (firstName, lastName, email, password) => async dispatch => {
  try {
    const user = await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name: firstName,
        family_name: lastName
      }
    })
    dispatch(receiveSignUp(user));
  } catch (error) {
    console.log(error);
    dispatch(receiveSignUpError(error));
  }
}

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