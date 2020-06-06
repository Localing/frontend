import React from "react";
import { Link } from "react-router-dom";

const MobileNavMenu = ({ isAuthenticated }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>
            HOME
          </Link>
        </li>

        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
            PRODUCTS
          </Link>
        </li>
        <li className="menu-item-has-children">
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
          {isAuthenticated ?
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                MY ACCOUNT
              </Link>
            </li>
            :
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                SIGN IN
              </Link>
            </li>
          }
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
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
