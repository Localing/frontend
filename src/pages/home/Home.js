import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import BusinessGrid from "../../components/business/BusinessGrid";
import Hero from "../../components/hero/Hero";
import { connect } from "react-redux";

const Home = ({ locationData, businessData }) => {

  const location = locationData.location;
  const businesses = businessData.businesses;

  return (
    <Fragment>
      <MetaTags>
        <title>Localing | Support locals businesses</title>
        <meta
          name="description"
          content="Support local business"
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
      >

        {/* Hero */}
        <Hero location={location} />

        {/* Business List */}
        <BusinessGrid businesses={businesses} />

      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    locationData: state.locationData,
    businessData: state.businessData
  };
};

export default connect(mapStateToProps)(Home);
