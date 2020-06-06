import PropTypes from "prop-types";
import React from "react";

const BusinessImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      <div className="product-fixed-image">
        {product.image ? (
          <img
            src={process.env.PUBLIC_URL + product.image[0]}
            alt=""
            className="img-fluid"
          />
        ) : (
            ""
          )}
      </div>
    </div>
  );
};

BusinessImageFixed.propTypes = {
  product: PropTypes.object
};

export default BusinessImageFixed;
