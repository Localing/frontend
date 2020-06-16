import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import ProductGridThree from "../../wrappers/product/ProductGridThree";
import { connect } from "react-redux";
import { Card, CardDeck } from "react-bootstrap";

const Home = ({ locationData }) => {
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

        <div className="hero-with-background-wrap hero2-wrap">
          <div className="w-layout-grid hero2-grid">
            <div id="w-node-6d7d04cfb30d-5fcf7beb" className="hero2-content">
              <div className="hero2-title">
                <div className="size1-text">Keep the heart of {locationData.location} beating</div>
                <p class="paragraph-70">Pre-order from local businesses, and unlock exclusive promotions, discounts and rewards for being loyal to your community!</p>
              </div>
              <a href="#" className="hero2-latest w-inline-block">
                <div className="hero2-image-collection"></div>
                <div>
                  <div className="size5-text">Wagglebumz</div>
                  <div className="paragraph-70">Something about the particular store that we are looking at.</div>
                </div>
              </a>
              <a data-w-id="c5f0c155-6190-2588-5dd5-6d7d04cfb31a" href="#" className="button-large hero3-button w-inline-block">
                <div>Discover shops in {locationData.location}</div><img src="assets/img/Arrow%402x.svg" alt="" class="button-arrow" />
              </a>
            </div>
            <div id="w-node-6d7d04cfb31e-5fcf7beb" className="hero2-product">
              <a href="#" className="hero2-product-name-link-wrap w-inline-block">
                <p className="hero2-product-name">Full Groom</p>
              </a>
              <p className="hero2-product-price">$930</p>
            </div>
          </div>
          <div className="w-layout-grid hero2-background">
            <div id="w-node-6d7d04cfb325-5fcf7beb" className="hero2-image"></div>
          </div>
        </div>

        <div class="container mt-3">
          <div class="row mt-4">
            <div class="col-md">
              <div class="product2-content-wrap">
                <div class="product2-content-card-wrap">
                  <div class="product2-name-wrap"><a href="#" class="size3-link">Longhorn Farmshop</a></div>
                  <a data-w-id="a4d32bec-35b8-3d48-6794-98329fb464b7" href="#" class="button-text w-inline-block">
                    <div class="button-label">Explore Products</div><img src="images/Arrow2x.svg" alt="" class="button-arrow" /></a>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="product2-content-wrap">
                <div class="product2-content-card-wrap">
                  <div class="product2-name-wrap"><a href="#" class="size3-link">Cottenham Tyre &amp; Auto</a></div>
                  <a data-w-id="a4d32bec-35b8-3d48-6794-98329fb464b7" href="#" class="button-text w-inline-block">
                    <div class="button-label">Explore Products</div><img src="images/Arrow2x.svg" alt="" class="button-arrow" /></a>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md">
              <div class="product2-content-wrap">
                <div class="product2-content-card-wrap">
                  <div class="product2-name-wrap"><a href="#" class="size3-link">Les Ward Grocery &amp; Florist</a></div>
                  <a data-w-id="a4d32bec-35b8-3d48-6794-98329fb464b7" href="#" class="button-text w-inline-block">
                    <div class="button-label">Explore Products</div><img src="images/Arrow2x.svg" alt="" class="button-arrow" /></a>
                </div>
              </div>
            </div>
            <div class="col-md">
              <div class="product2-content-wrap">
                <div class="product2-content-card-wrap">
                  <div class="product2-name-wrap"><a href="#" class="size3-link">Phoenix Club</a></div>
                  <a data-w-id="a4d32bec-35b8-3d48-6794-98329fb464b7" href="#" class="button-text w-inline-block">
                    <div class="button-label">Explore Products</div><img src="images/Arrow2x.svg" alt="" class="button-arrow" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* products  
        <div
          className={`product-area hm9-section-padding pb-60`}
        >
          <div className="container-fluid">
            <div className="custom-row-4">
              <ProductGridThree
                limit={5}
                spaceBottomClass="mb-35"
              />
            </div>
          </div>
        </div>
        */}

      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    locationData: state.locationData
  };
};

export default connect(mapStateToProps)(Home);
