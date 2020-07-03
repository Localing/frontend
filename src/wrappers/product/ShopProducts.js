import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({ products, layout, businessId }) => {

  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
        <ProductgridList products={products} businessId={businessId} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
  businessId: PropTypes.string
};

export default ShopProducts;
