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
  businessInfo["Chop Your Mop"] = "Don't want to look scruffy on those video calls.<button>hi</button>";
  businessInfo["Buns in the Oven"] = "Family-owned and operated since 1985.";
  businessInfo["Knead the Knots"] = "Feeling tight? Knot a problem.";
  businessInfo["Tasty Bistro"] = "Experience a taste of Paris at the classic french bistro.";
  businessInfo["Swish Swash"] = "See the world outside - wash your windows.";


  let badges = [];
  badges["The Family Bean"] = [
    '/assets/img/badges/ankur.png',
    '/assets/img/badges/terrell.png'
  ];
  badges["Chop Your Mop"] = [
    '/assets/img/badges/genna.png',
    '/assets/img/badges/rob.png'
  ];
  badges["Buns in the Oven"] = [
    '/assets/img/badges/deepak.png',
    '/assets/img/badges/rob.png'
  ];
  badges["Knead the Knots"] = [
    '/assets/img/badges/katie.png',
    '/assets/img/badges/genna.png'
  ];

  function MitigationStrategies() {
    return (
      <React.Fragment>
        <p><strong>How {product.category} will keep you safe</strong></p>
        <ul>
          <li><i className="fa fa-check"></i> All staff wear masks</li>
          <li><i className="fa fa-check"></i> Masks provided to customers</li>
          <li><i className="fa fa-check"></i> Hand sanitizer available</li>
        </ul>
      </React.Fragment>
    )
  }

  function ChopYourMop() {
    return (
      <React.Fragment>
        <p>
      <button className="btn btn-secondary btn-sm"><i className="fa fa-map-marker"></i>&nbsp;Cambridge, UK</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;Website</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-phone"></i>&nbsp;Call</button>
        </p>
        <br />
        <div>
          For 10 years, Shelley and her team have been styling ‘dos and chopping mops. The bouncing curls and flowing locks that walk out of ‘Chop that Mop’ are no coincidence; our passion keeps us buzzing around the store from dawn till dusk, keeping you up to date with all the town gossip in the meantime! We are itching to take back up the curling iron, but until then, we hope you stay safe, and make sure to keep up to date on that reality telly until we return!
      </div>
        <br />
        <MitigationStrategies />
      </React.Fragment>
    )
  }

  function TheFamilyBean() {
    return (
      <React.Fragment>
        <p>
      <button className="btn btn-secondary btn-sm"><i className="fa fa-map-marker"></i>&nbsp;Cambridge, UK</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;Website</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-phone"></i>&nbsp;Call</button>
        </p>
        <br />
        <div>
          Your favorite local coffee shop.      
        </div>
        <br />
        <MitigationStrategies />
      </React.Fragment>
    )
  }

  function BunsInTheOven() {
    return (
      <React.Fragment>
        <p>
      <button className="btn btn-secondary btn-sm"><i className="fa fa-map-marker"></i>&nbsp;Cambridge, UK</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;Website</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-phone"></i>&nbsp;Call</button>
        </p>
        <br />
        <div>
          We have been making all sorts of baked goods for over 20 years including cakes, cupcakes, cookies, and pastries.  
        </div>
        <br />
        <MitigationStrategies />
      </React.Fragment>
    )
  }

  function KneadTheKnots() {
    return (
      <React.Fragment>
        <p>
      <button className="btn btn-secondary btn-sm"><i className="fa fa-map-marker"></i>&nbsp;Cambridge, UK</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;Website</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-phone"></i>&nbsp;Call</button>
        </p>
        <br />
        <div>
          Feeling stressed? Come in for a deep whole body massage that will relax you.     
        </div>
        <br />
        <MitigationStrategies />
      </React.Fragment>
    )
  }


  function getBusinessInfo(businessName) {
    switch (businessName) {
      case "Chop Your Mop":
        return <ChopYourMop />;
        break;
      case "The Family Bean":
        return <TheFamilyBean />;
        break;
      case "Buns in the Oven":
        return <BunsInTheOven />;
        break;
      case "Knead the Knots":
        return <KneadTheKnots />;
        break;
      default:
        return ""
    }
  }
  return (
    <div className="product-details-content ml-70">
      <h2>{product.category}</h2>
      <div className="pro-details-list">
        {getBusinessInfo(product.category[0])}
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
              <Link to={{ pathname: "/shop-grid-standard", state: { category: product.category } }}>
                {" "}View Products{" "}
              </Link>
            </div>
          </div>
        )}

      <div>
        <h3>Supporters</h3>
        <div className="custom-row-3">
          {badges[product.category[0]].map(badgeURL => {
            return (
              <div className="col-5">
                <div className="product-wrap-2" >
                  <div className="product-img" style={{ 'padding': '0.5em' }}>
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
