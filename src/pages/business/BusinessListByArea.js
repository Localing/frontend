import React, { useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
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
import areas from '../../data/areas/areas.json';

const BusinessListByArea = ({ businesses, locationData, setLocation, clearLocationError, fetchBusinesses, match }) => {

    const area = areas.filter(area => area.id === match.params.area)[0];

    useEffect(() => {
        fetchBusinesses();
    }, [fetchBusinesses]);

    return (
        area ?
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
                                        <h3 className="display-4">{area.name}<br /> <span className="text-muted">High Street</span></h3>
                                        <br />
                                        <blockquote className="blockquote">
                                            <p class="mb-0">{area.heroQuote}</p>
                                        </blockquote>
                                    </Col>
                                    <Col>
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <iframe className="embed-responsive-item" src={area.heroVideo} allowfullscreen></iframe>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Jumbotron>
                    </Container>
                    {businesses.length ? (
                        <BusinessGridArea
                            businesses={businesses}
                            area={area.id}
                            locationData={locationData}
                            setLocation={setLocation}
                            clearLocationError={clearLocationError} />
                    )
                        :
                        (<h1>Loading...</h1>)}

                </LayoutOne>
            </Fragment>
            :
            <Redirect to="/not-found" />
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessListByArea);