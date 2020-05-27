import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, Redirect } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import LayoutOne from "../../layouts/LayoutOne";
import { connect } from 'react-redux';
import { loginUser, signUpUser } from '../../redux/actions/authActions';
import { Auth } from "aws-amplify";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

const LoginRegister = ({
  location,
  loginUser,
  signUpUser,
  loginError,
  signupError,
  isAuthenticated,
  isLoggingIn,
  isSigningUp }) => {
  const { pathname } = location;

  let { from } = location.state || { from: { pathname: "/" } };

  // Login form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up form fields
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    switch(name){
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
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(loginEmail, loginPassword);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    signUpUser(signupFirstName, signupLastName, signupEmail, signupPassword);
  }

  return (
    isAuthenticated ?
      <Redirect to={from} />
      :
      <Fragment>
        <MetaTags>
          <title>Localing | Login</title>
          <meta
            name="description"
            content="Localing Login"
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Login &amp; Register
      </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="login">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="login">
                            <h4>Login</h4>
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
                              <Button variant="outline-dark" onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })} block><i className="fa fa-facebook" />&nbsp;&nbsp;Login with Facebook</Button>
                              <Button variant="outline-dark" onClick={() => Auth.federatedSignIn({ provider: 'Google' })} block><i className="fa fa-google" />&nbsp;&nbsp;Login with Google</Button>
                              <hr />
                              <form onSubmit={handleLogin}>
                                {(loginError && loginError.message) && <Alert variant="danger"> {loginError.message} </Alert>}
                                <input
                                  type="text"
                                  name="loginEmail"
                                  placeholder="Email"
                                  value={loginEmail}
                                  onChange={handleChange}
                                />
                                <input
                                  type="password"
                                  name="loginPassword"
                                  placeholder="Password"
                                  value={loginPassword}
                                  onChange={handleChange}
                                />
                                <div className="button-box">
                                  <div className="login-toggle-btn">
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                      Forgot your password?
                                  </Link>
                                  </div>
                                  <button type="submit">
                                    { isLoggingIn && (<Spinner animation="border" size="sm" as="span" />) }
                                    Login
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="signup">
                          <div className="login-form-container">
                            <br />
                            <div className="login-register-form">
                              <form onSubmit={handleSignUp}>
                              {(signupError && signupError.message) && <Alert variant="danger"> {signupError.message} </Alert>}
                                <input
                                  type="text"
                                  name="signupFirstName"
                                  placeholder="First name"
                                  value={signupFirstName}
                                  onChange={handleChange}
                                />
                                <input 
                                  type="text"
                                  name="signupLastName"
                                  placeholder="Last name"
                                  value={signupLastName}
                                  onChange={handleChange}
                                />
                                <input
                                  name="signupEmail"
                                  placeholder="E-mail"
                                  type="email"
                                  value={signupEmail}
                                  onChange={handleChange}
                                />
                                <input
                                  type="password"
                                  name="signupPassword"
                                  placeholder="Password"
                                  value={signupPassword}
                                  onChange={handleChange}
                                />
                                <div className="button-box">
                                  <button type="submit">
                                  { isSigningUp && (<Spinner animation="border" size="sm" as="span" />) }
                                    Sign Up
                                  </button>
                                </div>
                              </form>
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

LoginRegister.propTypes = {
  location: PropTypes.object,
  isLoggingIn: PropTypes.bool,
  loginError: PropTypes.object,
  signupError: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
