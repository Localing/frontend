import PropTypes from "prop-types";
import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from "react-redux";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {

  // scrolls to business grid with offset to avoid navbar obscuring section header
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  }

  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""} mt-2`
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
            <Link to={process.env.PUBLIC_URL + "/shop"} scroll={el => scrollWithOffset(el)}>
              {" "}
              DISCOVER SHOPS
            </Link>
          </li>
          {/* <li>
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
          </li> */}
          <li>
            <Link to="/my-orders">
              MY ORDERS
            </Link>
          </li>
          <li>
            <Link to="/support">
              SUPPORT
            </Link>
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
