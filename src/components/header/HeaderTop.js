import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions/currencyActions";
import { setLocation, clearLocationError } from "../../redux/actions/locationActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({
  currency,
  setCurrency,
  currentLanguageCode,
  setLocation,
  clearLocationError,
  locationData,
  pointsData,
  dispatch,
  borderStyle
}) => {

  return (
    <div
      className={`header-top-wap ${
        borderStyle === "fluid-border" ? "border-bottom" : ""
      }`}
    >
      <LanguageCurrencyChanger
        currency={currency}
        setCurrency={setCurrency}
        locationData={locationData}
        setLocation={setLocation}
        clearLocationError={clearLocationError}
        pointsData={pointsData}
        currentLanguageCode={currentLanguageCode}
        dispatch={dispatch}
      />
      <div className="header-offer">
        <p>
          <a href="/about">About Us</a>
        </p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
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
    clearLocationError: () =>
      dispatch(clearLocationError()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderTop);
