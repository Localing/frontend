import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import ProductGridThree from "../../wrappers/product/ProductGridThree";

const BusinessDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare
}) => {
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );
  let businessInfo = [];
  businessInfo["The Family Bean"] = "Your friendly neighborhood coffee shop.";
  businessInfo["Chop Your Mop"] = "Don't want to look scruffy on those video calls.";
  businessInfo["Buns in the Oven"] = "Family-owned and operated since 1985.";
  businessInfo["Knead the Knots"] = "Feeling tight? Knot a problem.";
  businessInfo["Tasty Bistro"] = "Experience a taste of Paris at the classic french bistro.";
  businessInfo["Swish Swash"] = "See the world outside - wash your windows.";


  const badges = [
    '/assets/img/badges/katie.png',
    '/assets/img/badges/katie.png',
    '/assets/img/badges/katie.png',
    '/assets/img/badges/katie.png'
  ];
  return (
    <div className="product-details-content ml-70">
      <h2>{product.category}</h2>
      <div className="pro-details-list">
        <p>{businessInfo[product.category]}</p>
      </div>

      {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map(single => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                      return (
                        <label
                          className={`pro-details-size-content--single`}
                          key={key}
                        >
                          <input
                            type="radio"
                            value={singleSize.name}
                            checked={
                              singleSize.name === selectedProductSize
                                ? "checked"
                                : ""
                            }
                            onChange={() => {
                              setSelectedProductSize(singleSize.name);
                              setProductStock(singleSize.stock);
                              setQuantityCount(1);
                            }}
                          />
                          <span className="size-name">{singleSize.name}</span>
                        </label>
                      );
                    })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
          ""
        )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
          <div className="pro-details-quality">
            <div className="pro-details-cart btn-hover">
              {productStock && productStock > 0 ? (
                <button
                  onClick={() =>
                    addToCart(
                      product,
                      addToast,
                      quantityCount,
                      selectedProductColor,
                      selectedProductSize
                    )
                  }
                  disabled={productCartQty >= productStock}
                >
                  {" "}
                View Products{" "}
                </button>
              ) : (
                  <button disabled>Out of Stock</button>
                )}
            </div>
            <div className="pro-details-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to favorites"
                    : "Add to favorites"
                }
                onClick={() => addToWishlist(product, addToast)}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
          </div>
        )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
          ""
        )}


      <div className="container-fluid">
        <div>Local Heroes Supporting {product.category}:</div>
        <div className="custom-row-3">
          {badges.map(badgeURL => {
            return (
              <div className="col-5">
                <div className="product-wrap-2" >
                  <div className="product-img">
                    <img src={process.env.PUBLIC_URL + badgeURL} alt="" />
                  </div>
                </div>
              </div>
            );
          }
          )}
        </div>
      </div>
    </div>
  );
};

BusinessDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(null, mapDispatchToProps)(BusinessDescriptionInfo);
