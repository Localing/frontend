import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
//import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { Spinner } from 'react-bootstrap';
import { fetchProduct, clearProduct } from "../../redux/actions/productActions";
import { connect } from 'react-redux';

const Product = ({ 
  match, 
  product, 
  fetchProduct, 
  isFetchingProduct,
  fetchProductError, 
  clearProduct }) => {

  const businessId = match.params.businessId;
  const productId = match.params.productId;

  useEffect(() => {
    fetchProduct(businessId, productId)
    return () => clearProduct();
  }, [businessId, productId, clearProduct, fetchProduct]);

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
        {!isFetchingProduct && product ?
          <Fragment>
            {/* product description with image */}
            <ProductImageDescription
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
            {!fetchProductError ?
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner> :
              <p className="lead">Sorry, something went wrong. Please try again!</p>
            }
          </div>
        }

      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
      product: state.productData.product,
      isFetchingProduct: state.productData.isFetching,
      fetchProductError: state.productData.fetchProductError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetchProduct: (businessId, productId) => dispatch(fetchProduct(businessId, productId)),
      clearProduct: () => dispatch(clearProduct()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
