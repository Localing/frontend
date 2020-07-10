import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, Redirect } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import LayoutOne from "../../layouts/LayoutOne";
import { connect } from 'react-redux';
import { loginUser, signUpUser } from '../../redux/actions/authActions';
import { Auth } from "aws-amplify";

const Login = ({
  location,
  loginUser,
  signUpUser,
  loginError,
  signupError,
  signupSuccess,
  isAuthenticated,
  isLoggingIn,
  isSigningUp,
  startPage }) => {

  let { from } = location.state || { from: { pathname: "/" } };

  const [activePage, setActivePage] = useState(startPage);

  // Login form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up form fields
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const clearLoginFields = () => {
    setLoginEmail("");
    setLoginPassword("");
  }

  const clearSignUpFields = () => {
    setSignupFirstName("");
    setSignupLastName("");
    setSignupEmail("");
    setSignupPassword("");
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    switch (name) {
      // login
      case 'loginEmail':
        setLoginEmail(value);
        break;
      case 'loginPassword':
        setLoginPassword(value);
        break;

      // signup
      case 'signupFirstName':
        setSignupFirstName(value);
        break;
      case 'signupLastName':
        setSignupLastName(value);
        break;
      case 'signupEmail':
        setSignupEmail(value);
        break;
      case 'signupPassword':
        setSignupPassword(value);
        break;
      default:
        break;
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(loginEmail, loginPassword);
    clearLoginFields();
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    signUpUser(signupFirstName, signupLastName, signupEmail, signupPassword);
    clearSignUpFields();
  }

  return (
    isAuthenticated ?
      <Redirect to={from} />
      :
      <Fragment>
        <MetaTags>
          <title>Localing | Login and Signup</title>
          <meta
            name="description"
            content="Localing Login and Signup"
          />
        </MetaTags>
        <LayoutOne>
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container activeKey={activePage} onSelect={(key) => setActivePage(key)}>
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="login">
                            <h4>Log In</h4>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="signup">
                            <h4>Sign Up</h4>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="login">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form onSubmit={handleLogin}>
                                {(loginError && loginError.message) && <Alert variant="danger"> {loginError.message} </Alert>}
                                <p className="lead text-center">Log in to your account</p>
                                <input
                                  type="text"
                                  name="loginEmail"
                                  placeholder="Email"
                                  value={loginEmail}
                                  onChange={handleChange}
                                  required
                                />
                                <input
                                  type="password"
                                  name="loginPassword"
                                  placeholder="Password"
                                  value={loginPassword}
                                  onChange={handleChange}
                                  required
                                />
                                <div>
                                  <div className="text-right">
                                    <Link to={process.env.PUBLIC_URL + "/reset-password"}>
                                      Forgot your password?
                                  </Link>
                                  </div>
                                  <div className="pt-4">
                                  <TermsNotice type="login" />
                                  {isLoggingIn ?
                                    <Button variant="outline-dark" size="lg" className="square-corners" type="submit" block disabled>
                                      <Spinner animation="border" size="sm" as="span" />&nbsp;&nbsp;
                                      Login
                                    </Button>
                                    :
                                    <Button variant="outline-dark" size="lg" className="square-corners" block type="submit">
                                      Login
                                    </Button>
                                  }
                                  </div>
                                </div>
                              </form>
                              <p className="lead text-center pt-2 pb-2">or</p>
                              <Button variant="outline-dark" className="square-corners" onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })} block><i className="fa fa-facebook" />&nbsp;&nbsp;Sign In with Facebook</Button>
                              <Button variant="outline-dark" className="square-corners" onClick={() => Auth.federatedSignIn({ provider: 'Google' })} block><i className="fa fa-google" />&nbsp;&nbsp;Sign In with Google</Button>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="signup">
                          <div className="login-form-container">
                            <br />
                            <div className="login-register-form">
                              <form onSubmit={handleSignUp}>
                                {(signupError && signupError.message) && <Alert variant="danger"> {signupError.message} </Alert>}
                                {signupSuccess && <Alert variant="success"> Please check your email to verify your account. </Alert>}
                                <p className="lead text-center">Sign up for an account</p>
                                <input
                                  type="text"
                                  name="signupFirstName"
                                  placeholder="First name*"
                                  value={signupFirstName}
                                  onChange={handleChange}
                                  required
                                />
                                <input
                                  type="text"
                                  name="signupLastName"
                                  placeholder="Last name*"
                                  value={signupLastName}
                                  onChange={handleChange}
                                  required
                                />
                                <input
                                  name="signupEmail"
                                  placeholder="E-mail*"
                                  type="email"
                                  value={signupEmail}
                                  onChange={handleChange}
                                  required
                                />
                                <input
                                  type="password"
                                  name="signupPassword"
                                  placeholder="Password*"
                                  value={signupPassword}
                                  onChange={handleChange}
                                  required
                                />
                                <TermsNotice type="signup" />
                                <div>
                                  {isSigningUp ?
                                    <Button variant="outline-dark" size="lg" className="square-corners" type="submit" block disabled>
                                      <Spinner animation="border" size="sm" as="span" />&nbsp;&nbsp;
                                    <span>Sign Up</span>
                                    </Button>
                                    :
                                    <Button variant="outline-dark" size="lg" className="square-corners" type="submit" block>
                                      Sign Up
                                    </Button>
                                  }
                                </div>
                              </form>
                              <div>
                                <p className="lead text-center pt-2 pb-2">or</p>
                              </div>
                              <div>
                                <Button variant="outline-dark" style={{ borderRadius: 0 }} onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })} block><i className="fa fa-facebook" />&nbsp;&nbsp;Sign In with Facebook</Button>
                                <Button variant="outline-dark" style={{ borderRadius: 0 }} onClick={() => Auth.federatedSignIn({ provider: 'Google' })} block><i className="fa fa-google" />&nbsp;&nbsp;Sign In with Google</Button>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
  );
};

const TermsNotice = ({ type }) => {

  const action = (type === "login") ? "logging in" : "signing up";

  return (
    <p>By {action}, I agree to the <Link to="/terms" style={{ textDecoration: 'underline'}}>Terms of Use</Link> and have read the <Link to="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policies</Link>.</p>
  )
}

Login.propTypes = {
  location: PropTypes.object,
  isLoggingIn: PropTypes.bool,
  loginError: PropTypes.object,
  signupError: PropTypes.object,
  signupSuccess: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  loginUser: PropTypes.func,
  signUpUser: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isLoggingIn: state.authData.isLoggingIn,
    loginError: state.authData.loginError,
    isSigningUp: state.authData.isSigningUp,
    signupError: state.authData.signupError,
    signupSuccess: state.authData.signupSuccess,
    isAuthenticated: state.authData.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => {
      dispatch(loginUser(email, password));
    },
    signUpUser: (firstName, lastName, email, password) => {
      dispatch(signUpUser(firstName, lastName, email, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
