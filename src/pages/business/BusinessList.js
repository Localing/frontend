import React, { useEffect, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import { connect } from 'react-redux';
import BusinessGrid from "../../components/business/BusinessGrid";
import { setLocation, clearLocationError } from "../../redux/actions/locationActions";
import { fetchBusinesses } from "../../redux/actions/businessActions";
import LayoutOne from "../../layouts/LayoutOne";

const BusinessList = ({ businesses, locationData, setLocation, clearLocationError, fetchBusinesses }) => {

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
        {businesses.length ? (
        <BusinessGrid
            businesses={businesses}
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