import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h1>About Localing</h1>
          <p>The economic shutdown has impacted millions of small businesses. Localing is a platform created by a team of Cambridge students that enables local businesses to thrive by connecting with local customers and the wider community. Localing lets you pre-order from local businesses, unlocking exclusive promotions, discounts and rewards for being loyal to your community!</p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;