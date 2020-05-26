import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import BusinessDescription from "../../wrappers/product/BusinessDescription";

const Business
  = ({ location, product }) => {
    const { pathname } = location;

    return (
      <Fragment>
        <MetaTags>
          <title>Localing | Business Page</title>
          <meta
            name="description"
            content="Business page"
          />
        </MetaTags>

        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Business
      </BreadcrumbsItem>

        <LayoutOne headerTop="visible">
          {/* breadcrumb */}

          {/* product description with image */}
          <BusinessDescription
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            product={product}
            galleryType="fixedImage"
          />
        </LayoutOne>
      </Fragment>
    );
  };

Business.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      single => single.id === itemId
    )[0]
  };
};

export default connect(mapStateToProps)(Business);
