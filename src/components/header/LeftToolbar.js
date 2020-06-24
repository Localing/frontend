import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, OverlayTrigger } from "react-bootstrap";
import LevelModal from "../levels/LevelModal";

const LeftToolbar = ({
  currency,
  setCurrency,
  setLocation,
  clearLocationError,
  locationData,
  pointsData,
  dispatch
}) => {

  // const setCurrencyTrigger = e => {
  //   const currencyName = e.target.value;
  //   setCurrency(currencyName);
  // };

  // handling badge modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);


  // handling changes to postcodes
  const [postcode, setPostcode] = useState("");

  const handlePostcodeSubmit = (event) => {
    event.preventDefault();
    setLocation(postcode);
  }

  return (
    <div className="language-currency-wrap">

      {/* badge modal */}

      <LevelModal show={show} handleClose={handleClose} />


      {/* <div className="same-language-currency language-style">
        <span>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={postcodePopover}
            rootClose>
            <Button variant="outline-dark" size="sm">
              <i className="fa fa-map-marker" />
              {" " + locationData.location}
            </Button>
          </OverlayTrigger>
        </span>
      </div> */}

      {/* Disabled currency changer 

      <div className="same-language-currency use-style">
        <Button variant="outline-dark" size="sm">
          {currency.currencyName} <i className="fa fa-angle-down" />
        </Button>
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
    */}

      <div className="same-language-currency use-style">
        <Button variant="outline-dark" size="sm" onClick={handleShow}>{pointsData.points} hero points</Button>
      </div>
    </div>
  );
};

LeftToolbar.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  dispatch: PropTypes.func
};

export default LeftToolbar;
