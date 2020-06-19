import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NavMenu = ({ menuWhiteClass, sidebarMenu, isAuthenticated }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
        } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/products"}>
              {" "}
              SHOP
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to={process.env.PUBLIC_URL + "/"}>
                MY LOCALING
              {sidebarMenu ? (
                  <span>
                    <i className="fa fa-angle-right"></i>
                  </span>
                ) : (
                    <i className="fa fa-angle-down" />
                  )}
              </Link>
              <ul className="submenu">
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
                  <Link to={process.env.PUBLIC_URL + "/hero-points"}>
                    MY HERO POINTS
                </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <Link to="/login">
                MY LOCALING
              </Link>
            </li>
          )}
          <li>
            <a href="https://business.localing.co.uk/" target="_blank">
              FOR BUSINESSES
            </a>
          </li>
        </ul>
      </nav>
    </div >
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authData.isAuthenticated
  };
};

export default connect(mapStateToProps)(NavMenu);
