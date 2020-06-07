import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import BusinessDescription from "../../wrappers/business/BusinessDescription";

const Business
  = ({ business }) => {

    return (
      <Fragment>
        <MetaTags>
          <title>Localing | Business Page</title>
          <meta
            name="description"
            content="Business page"
          />
        </MetaTags>

        <LayoutOne headerTop="visible">
          {/* business description with image */}
          <BusinessDescription
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            business={business}
            galleryType="fixedImage"
          />
        </LayoutOne>
      </Fragment>
    );
  };

Business.propTypes = {
  business: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const businessId = ownProps.match.params.id;
  return {
    business: state.businessData.businesses.filter(
      single => single.id === businessId
    )[0]
  };
};

export default connect(mapStateToProps)(Business);
