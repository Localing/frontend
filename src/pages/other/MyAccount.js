import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import LayoutOne from "../../layouts/LayoutOne";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

const MyAccount = ({ isAuthenticated, user }) => {

  // user profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // change password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setAttributes();
    }
  }, [isAuthenticated])

  const setAttributes = () => {
    setFirstName(user.profile.given_name);
    setLastName(user.profile.family_name);
    setEmail(user.profile.email);
    setPhone(user.profile.phone);
  }

  const handleChangePassword = (event) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setChangePasswordMessage("Passwords must match.");
      return;
    }

    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, currentPassword, confirmNewPassword);
      })
      .then(data => {
        setChangePasswordMessage("Your password was changed successfully.");
      })
      .catch(err => {
        setChangePasswordMessage(err.message);
      });

    clearFields();

  }

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    switch (name) {
      case 'currentPassword':
        setCurrentPassword(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmNewPassword':
        setConfirmNewPassword(value);
        break;
      default:
        break;
    }
    
  };

  const clearFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }

  return (
    !isAuthenticated ? <Redirect to="/login" /> :
      <Fragment>
        <MetaTags>
          <title>Localing | My Account</title>
          <meta
            name="description"
            content="Localing account page"
          />
        </MetaTags>
        <LayoutOne headerTop="visible">
          <div className="myaccount-area pb-80 pt-100">
            <div className="container">
              <div className="row">
                <div className="ml-auto mr-auto col-lg-9">
                  <div className="myaccount-wrapper">
                    <Accordion defaultActiveKey="0">
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="0">
                            <h3 className="panel-title">
                              Account Information{" "}
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h5>Personal Information</h5>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>First Name</label>
                                    <input type="text" value={firstName} disabled />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Last Name</label>
                                    <input type="text" value={lastName} disabled />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Email Address</label>
                                    <input type="email" value={email} disabled />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Phone</label>
                                    <input type="text" value={phone} disabled />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="1">
                            <h3 className="panel-title">
                              Change your password
                          </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            {changePasswordMessage !== "" && <Alert variant="dark">{changePasswordMessage}</Alert>}
                            <div className="myaccount-info-wrapper">
                              <form onSubmit={handleChangePassword}>
                                <div className="row">
                                  <div className="col-lg-12 col-md-12">
                                    <div className="billing-info">
                                      <label>Current Password</label>
                                      <input type="password" name="currentPassword" value={currentPassword} onChange={handleChange} required />
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="billing-info">
                                      <label>New Password</label>
                                      <input type="password" name="newPassword" value={newPassword} onChange={handleChange} required />
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="billing-info">
                                      <label>Confirm New Password</label>
                                      <input type="password" name="confirmNewPassword" value={confirmNewPassword} onChange={handleChange} required />
                                    </div>
                                  </div>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <button type="submit">Continue</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    user: state.authData.user,
    isAuthenticated: state.authData.isAuthenticated
  }
}

export default connect(mapStateToProps)(MyAccount);
