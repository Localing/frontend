import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/authActions";
import { connect } from "react-redux";

const MobileNavMenu = ({ isAuthenticated, user, logoutUser }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        {isAuthenticated &&
          <li>
            Hi {user.profile.given_name}
          </li>
        }
        <hr />
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>
            HOME
          </Link>
        </li>
        {isAuthenticated ?
          <Fragment>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                MY ACCOUNT
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-orders"}>
                MY ORDERS
              </Link>
            </li>
            <li>
              <a onClick={() => logoutUser()}>
                LOG OUT
              </a>
            </li>
          </Fragment>
          :
          <Fragment>
            <li>
              <Link to={process.env.PUBLIC_URL + "/signup"}>
                SIGN UP
            </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login"}>
                LOG IN
              </Link>
            </li>
          </Fragment>
        }
        <hr />
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/shop"}>
            SHOP
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/cart"}>
            CART
              </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/checkout"}>
            CHECKOUT
              </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/wishlist"}>
            WISHLIST
              </Link>
        </li>
        <hr />
        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>
            ABOUT US
              </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            CONTACT US
              </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authData.isAuthenticated,
    user: state.authData.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileNavMenu);
