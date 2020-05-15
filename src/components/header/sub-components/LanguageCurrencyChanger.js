import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { changeLanguage } from "redux-multilanguage";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const LanguageCurrencyChanger = ({
  currency,
  setCurrency,
  currentLanguageCode,
  setLocation,
  locationData,
  dispatch
}) => {
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    setCurrency(currencyName);
  };

  const points = useSelector(state => state.pointsData.points);
  //const location = useSelector(state => state.locationData.location);
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);
  
  return (
    <div className="language-currency-wrap">
      {/* badge popup */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Body>
          <div className="text-center">
            <h2>You've unlocked the Queen badge!</h2>
            <br />
            <div className="container">
              <img src="assets/img/badges/katie.png" width="200" style={{'borderRadius':'10px'}} />
            </div>
            <br />
            <button className="btn btn-dark"><i class="fa fa-instagram"></i>&nbsp;Share your badge</button><br /><br />
            <button className="btn btn-info" onClick={handleClose}>Back to Home</button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="same-language-currency language-style">
        <span>
        <i className="fa fa-map-marker" />
        {" " + locationData.location}  
        </span>
      </div>
      <div className="same-language-currency use-style">
        <span>
          {currency.currencyName} <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="USD" onClick={e => setCurrencyTrigger(e)}>
                $ USD
              </button>
            </li>
            <li>
              <button value="EUR" onClick={e => setCurrencyTrigger(e)}>
                € EUR
              </button>
            </li>
            <li>
              <button value="GBP" onClick={e => setCurrencyTrigger(e)}>
                £ GBP
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency use-style">
        <button className="btn btn-secondary btn-sm" onClick={handleShow}>{points} hero points</button>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

export default LanguageCurrencyChanger;
