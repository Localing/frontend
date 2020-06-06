import PropTypes from "prop-types";
import React from "react";
import { useToasts } from "react-toast-notifications";
import BusinessDescriptionInfo from "../../components/business/BusinessDescriptionInfo";

const BusinessDescription = ({
  spaceTopClass,
  spaceBottomClass,
  business
}) => {
  const { addToast } = useToasts();

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <BusinessDescriptionInfo
              business={business}
              addToast={addToast}
            />
          </div>
        </div>
      </div>
    </div>

  );
};

BusinessDescription.propTypes = {
  business: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BusinessDescription;
