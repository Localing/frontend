import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions/currencyActions";
import { setLocation } from "../../redux/actions/locationActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({
  currency,
  setCurrency,
  currentLanguageCode,
  setLocation,
  locationData,
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
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    locationData: state.locationData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrency: currencyName => {
      dispatch(setCurrency(currencyName));
    },
    setLocation: postcode => {
      dispatch(setLocation(postcode));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderTop));
