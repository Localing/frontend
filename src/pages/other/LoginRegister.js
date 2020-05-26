import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, Redirect } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

const LoginRegister = ({
  location,
  loginUser,
  loginError,
  isAuthenticated }) => {
  const { pathname } = location;

  let { from } = location.state || { from: { pathname: "/" } };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email, password);
  };

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
                        <AmplifyAuthenticator usernameAlias="email">
                        </AmplifyAuthenticator>
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
  errorMessage: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isLoggingIn: state.authData.isLoggingIn,
    loginError: state.authData.loginError,
    errorMessage: state.authData.errorMessage,
    isAuthenticated: state.authData.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => {
      dispatch(loginUser(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);
