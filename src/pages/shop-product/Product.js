import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import API from "../../services/API";
import { Spinner } from 'react-bootstrap';
import { fetchProduct, clearProduct } from "../../redux/actions/productActions";
import { connect } from 'react-redux';

const Product = ({ match, product, fetchProduct, clearProduct }) => {

  const businessId = match.params.businessId;
  const productId = match.params.productId;

  const [loadingError, setLoadingError] = useState("");

  useEffect(() => {
    fetchProduct(businessId, productId)
    return () => clearProduct();
  }, []);

  return (
    <Fragment>
      <MetaTags>
        <title>Localing | {product && product.name}</title>
        <meta
          name="description"
          content={`Localing - ${product && product.name}`}
        />
      </MetaTags>

      <LayoutOne>
        {product ?
          <Fragment>
            {/* product description with image */}
            < ProductImageDescription
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={product}
              galleryType="fixedImage"
            />

            {/* related product slider 
            <RelatedProductSlider
              spaceBottomClass="pb-95"
              category={product.category[0]}
            /> */}
          </Fragment>
          :
          <div className="mx-auto mt-5 mb-5 text-center">
            <h2 className="display-4 mb-4">Loading great deals!</h2>
            {!loadingError ?
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner> :
              <p className="lead">{loadingError}</p>
            }
          </div>
        }

      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
      product: state.productData.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchProduct: (businessId, productId) => dispatch(fetchProduct(businessId, productId)),
      clearProduct: () => dispatch(clearProduct()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
