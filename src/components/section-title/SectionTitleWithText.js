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
          <p>
          Localing is a community hub to enable customers to support their favourite local small businesses during the coronavirus lockdown. In exchange for discounted pre-purchases now, customers will receive their goods and services in the future when the lockdown measures are eased and normal business resumes. This helps these businesses with the cash flow that they need right now to cover their costs during lockdown. </p>
          <br />
          
          <p>Localing uses gamification to incentivise customers with Local Hero badges that they can share via social media. The platform enables customers to track when their favourite businesses resume operations and the types of safety measures, such as social distancing and availability of hand sanitizers, that they have implemented to reduce the risk of coronavirus transmission.
{" "}
          </p>
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
