import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import BusinessGrid from "../../components/business/BusinessGrid";
import Hero from "../../components/home/Hero";
import Loading from "../../components/home/Loading";
import SubscribeEmail from "../../components/footer/sub-components/SubscribeEmail";
import { setLocation, clearLocationError } from "../../redux/actions/locationActions";
import { fetchBusinesses } from "../../redux/actions/businessActions";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { HashLink as Link } from 'react-router-hash-link';

const Home = ({ setLocation, clearLocationError, locationData, businesses, fetchBusinesses }) => {

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <Fragment>
      <Fragment>
        <MetaTags>
          <title>Localing | Support local businesses</title>
          <meta
            name="description"
            content="Support local businesses"
          />
        </MetaTags>
        <LayoutOne
          headerContainerclassName="container-fluid"
          headerPaddingclassName="header-padding-2"
        >
          {(businesses.length) ?
            <Fragment>

              {/* Hero */}
              <Hero
                locationData={locationData}
                setLocation={setLocation}
                clearLocationError={clearLocationError}
                businesses={businesses} />

              {/* Business List */}
              <Container className="mt-5 pt-5" id="shop">
                <h1>Welcome to Localing! </h1>
                <h3>Let us help you re-discover your favourite local shops.</h3>
              </Container>

              <BusinessGrid
                businesses={businesses}
                locationData={locationData}
                setLocation={setLocation}
                clearLocationError={clearLocationError} />

              {/* Info Panel */}
              <Container className="mt-5">
                <h1>Get to know Localing </h1>
                <h3>Learn about us and our team.</h3>
              </Container>
              <Container className="mt-5">
                <div className="w-layout-grid content7-grid">
                  <div id="w-node-bd1afaf93b5a-a9e5511a" className="content7-content-wrap">
                    <div>
                      <div className="size1-text">Meet Localing</div>
                      <div className="paragraph-70">We are dedicated to supporting local independent businesses.</div>
                      <Link to="/about"><button className="button-small">Learn more <img src="assets/img/Arrow%402x.svg" alt="" class="button-arrow" /></button></Link>
                    </div>
                  </div>
                  <div id="w-node-bd1afaf93b60-a9e5511a" className="content7-image"></div>
                </div>
              </Container>

              {/* Newsletter Subscribe Panel */}
              <Container className="mt-5">
                <Row>
                  <Col md>
                    <h3>Stay up to date with our exclusive promotions and deals!</h3>
                  </Col>
                  <Col md>
                    <SubscribeEmail mailchimpUrl="https://localing.us10.list-manage.com/subscribe/post?u=712d1a91dc38e66b05613c5a8&amp;id=2498b9362f" />
                  </Col>
                </Row>
                <hr />
              </Container>
            </Fragment>
            :
            <Loading />
          }
        </LayoutOne>
      </Fragment>

    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    locationData: state.locationData,
    businesses: state.businessData.businesses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLocation: postcode => {
      dispatch(setLocation(postcode));
    },
    clearLocationError: () => {
      dispatch(clearLocationError());
    },
    fetchBusinesses: () => {
      dispatch(fetchBusinesses());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
