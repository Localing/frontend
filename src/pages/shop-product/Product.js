import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

const Product = ({ location, product }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Localing | {product.name}</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <LayoutOne headerTop="visible">
        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        />
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
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

export default connect(mapStateToProps)(Product);
