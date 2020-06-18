import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
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
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              {" "}
              SHOP
            </Link>
          </li>
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

          <li>
            <a href="https://business.localing.co.uk" target="_blank" rel="noopener noreferrer">
              FOR BUSINESSES
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool
};

export default NavMenu;
