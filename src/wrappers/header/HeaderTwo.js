import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions/currencyActions";
import { setLocation, clearLocationError } from "../../redux/actions/locationActions";
import Logo from "../../components/header/Logo";
import RightToolbar from "../../components/header/RightToolbar";
import NavMenu from "../../components/header/NavMenu";
import MobileMenu from "../../components/header/MobileMenu";
import LeftToolbar from "../../components/header/LeftToolbar";

const HeaderTwo = ({
  currency,
  setCurrency,
  currentLanguageCode,
  locationData,
  setLocation,
  clearLocationError,
  pointsData,
  dispatch
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header className="header-area clearfix header-hm9 transparent-bar">
      <div className="container">
        <div className="header-top-area d-none d-lg-block">
          <div className="row">
            <div className="col-lg-5 col-md-8 col-12">
              {/* Left Toolbar */}
              <LeftToolbar
                currency={currency}
                setCurrency={setCurrency}
                locationData={locationData}
                setLocation={setLocation}
                clearLocationError={clearLocationError}
                pointsData={pointsData}
                currentLanguageCode={currentLanguageCode}
                dispatch={dispatch}
              />
            </div>
            <div className="col-lg-2 d-none d-lg-block text-center">
              {/* header logo */}
              <Logo
                imageUrl="/assets/img/logo/localing-logo.png"
                logoClass="logo-hm-9"
              />
            </div>
            <div className="col-lg-5 col-md-4 col-12">
              {/* Icon group */}
              <RightToolbar />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`header-bottom sticky-bar header-res-padding header-padding-2 ${
          scroll > headerTop ? "stick" : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-6 d-block d-lg-none">
              {/* header logo */}
              <Logo imageUrl="/assets/img/logo/localing-logo.png" />
            </div>
            <div className="col-6 d-block d-lg-none">
              {/* Icon group */}
              <RightToolbar />
            </div>
            <div className="col-xl-12 col-lg-12 d-none d-lg-block">
              <NavMenu />
            </div>
          </div>
          {/* mobile menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

HeaderTwo.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  locationData: PropTypes.object,
  setLocation: PropTypes.func,
  clearLocationError: PropTypes.func,
  pointsData: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    locationData: state.locationData,
    pointsData: state.pointsData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrency: currencyName => {
      dispatch(setCurrency(currencyName));
    },
    setLocation: postcode => {
      dispatch(setLocation(postcode));
    },
    clearLocationError: () => dispatch(clearLocationError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderTwo);
