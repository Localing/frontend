import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import BusinessGrid from "../../components/business/BusinessGrid";
import Hero from "../../components/home/Hero";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

const Home = ({ locationData, businessData }) => {

  const location = locationData.location;
  const businesses = businessData.businesses;

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
        headerContainerclassName="container-fluid"
        headerPaddingclassName="header-padding-2"
      >

        {/* Hero */}
        <Hero location={location} />

        {/* Business List */}
        <Container className="mt-5">
          <h1>Welcome to Localing! </h1>
          <h3>Let us help you re-discover your favourite local shops.</h3>
        </Container>

        <BusinessGrid businesses={businesses} />

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
                <div className="paragraph-70">This is the spot where will list off all the cool stuff about our company and how amazing we are. </div>
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
              <form id="email-form" name="email-form">
                <input type="email" className="text-field right-margin-field" maxLength="256" placeholder="Enter your email" required="" />
                <input type="submit" value="Subscribe" data-wait="Please wait..." className="subscribe-button" />
              </form>
            </Col>
          </Row>
          <hr />
        </Container>

      </LayoutOne>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    locationData: state.locationData,
    businessData: state.businessData
  };
};

export default connect(mapStateToProps)(Home);
