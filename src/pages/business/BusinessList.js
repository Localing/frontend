import React, { useEffect, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import { connect } from 'react-redux';
import BusinessGridArea from "../../components/business/BusinessGridArea";
import { setLocation, clearLocationError } from "../../redux/actions/locationActions";
import { fetchBusinesses } from "../../redux/actions/businessActions";
import LayoutOne from "../../layouts/LayoutOne";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BusinessList = ({ businesses, locationData, setLocation, clearLocationError, fetchBusinesses, match }) => {

    const area = match.params.area === "histon-and-impington" ? "histon" : "cottenham";

    useEffect(() => {
        fetchBusinesses();
    }, [fetchBusinesses]);

    return (
        <Fragment>
            <MetaTags>
                <title>Localing | Support local businesses</title>
                <meta
                    name="description"
                    content="Support local businesses"
                />
            </MetaTags>
            <LayoutOne>
                <Container>
                    <Jumbotron className="mt-2" style={{ backgroundColor: '#E7ECEF' }}>
                        <div className="text-center">
                            <Row className="align-items-center">
                                <Col>
                                    <p className="lead">Welcome to the</p>
                                    <h3 className="display-4">{area === "histon" ? "Histon & Impington" : "Cottenham"} <br /> <span className="text-muted">High Street</span></h3>
                                    <br />
                                    <blockquote className="blockquote">
                                        <p class="mb-0">Katie will come up with something to write here.</p>
                                        <footer class="blockquote-footer">Someone famous in <cite title="Source Title">some book</cite></footer>
                                    </blockquote>
                                </Col>
                                <Col>
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/1f-o1yiCgXI?autoplay=1" allowfullscreen></iframe>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Jumbotron>
                </Container>
                {businesses.length ? (
                    <BusinessGridArea
                        businesses={businesses}
                        area={area}
                        locationData={locationData}
                        setLocation={setLocation}
                        clearLocationError={clearLocationError} />
                )
                    :
                    (<h1>Loading...</h1>)}

            </LayoutOne>
        </Fragment>

    )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);