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

const Home = ({ setLocation, clearLocationError, locationData, businessData, authData, fetchBusinesses }) => {

  const businesses = businessData.businesses;

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

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
              <Container className="mt-5 pt-5 d-none d-sm-block" id="shop">
                <h1>Welcome to Localing! </h1>
                <h3>Let us help you re-discover your favourite local shops.</h3>
              </Container>

              <BusinessGrid
                businesses={businesses}
                locationData={locationData}
                setLocation={setLocation}
                clearLocationError={clearLocationError} />

              { !authData.isAuthenticated && 
              <Container className="mt-5 mb-5">
                <Row>
                  <Col md>
                    <h3><Link to="/signup" style={{ textDecoration: 'underline' }}>Sign up for an account</Link> or join our mailing list to stay up to date with our exclusive promotions and deals!</h3>
                  </Col>
                  <Col md>
                    <SubscribeEmail mailchimpUrl="https://localing.us10.list-manage.com/subscribe/post?u=712d1a91dc38e66b05613c5a8&amp;id=2498b9362f" />
                  </Col>
                </Row>
                <hr />
              </Container>
              }

              {/* Info Panel */}
              <Container className="mt-5 mb-5 d-none d-md-block">
                <h2>Get to know Localing</h2>
                <p className="lead">We are dedicated to supporting local independent businesses.</p>
                <div className="w-layout-grid content7-grid">
                  <div id="w-node-bd1afaf93b5a-a9e5511a" className="content7-content-wrap">
                    <div>
                      <div className="maroon-header-text">Meet our Team</div>
                      <div className="hero-paragraph">Localing is a platform created by a team of Cambridge students that enables local businesses to thrive by connecting with local customers and the wider community.</div>
                      <Link to="/about"><button className="button-small">Learn more <img src="assets/img/Arrow%402x.svg" alt="" className="button-arrow" /></button></Link>
                    </div>
                  </div>
                  <div id="w-node-bd1afaf93b60-a9e5511a" className="content7-image"></div>
                </div>
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
    businessData: state.businessData,
    authData: state.authData
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
