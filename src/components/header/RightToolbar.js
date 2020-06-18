import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { logoutUser } from "../../redux/actions/authActions";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

const RightToolbar = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass,
  isAuthenticated,
  logoutUser,
  user
}) => {

  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      {/* isAuthenticated ?
        <Dropdown className="d-none d-md-block">
          <Dropdown.Toggle variant="outline-dark" id="account-dropdown" size="sm">
            My Account
         </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href={process.env.PUBLIC_URL + "/my-account"}>My Account</Dropdown.Item>
            <Dropdown.Item href={process.env.PUBLIC_URL + "/my-orders"}>My Orders</Dropdown.Item>
            <Dropdown.Item onClick={() => logoutUser()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        :

        <Link to={process.env.PUBLIC_URL + "/login"}><Button variant="outline-dark" size="sm" className="d-none d-md-block">Log In</Button></Link>
      */}

      {/* Disable compare icon

      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div>
      */}

      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

RightToolbar.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
    isAuthenticated: state.authData.isAuthenticated,
    user: state.authData.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    logoutUser: () => {
      dispatch(logoutUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightToolbar);
