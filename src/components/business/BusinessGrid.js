import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from "react-bootstrap";
import { getDistance, convertDistance } from 'geolib';
import { Link } from "react-router-dom";

const BusinessGrid = ({ businesses, locationData }) => {

  const [businessesToDisplay, setBusinessesToDisplay] = useState([...businesses]);
  const [filterRadius, setFilterRadius] = useState(0);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    sortBusinesses();
  }, [locationData, filterRadius, filterCategory])

  const sortBusinesses = () => {
    let sortedBusinesses = [...businesses];

    sortedBusinesses.forEach((business) => {
      const distanceInMeters = getDistance({ latitude: locationData.latitude, longitude: locationData.longitude }, { latitude: business.latitude, longitude: business.longitude });
      business.distance = convertDistance(distanceInMeters, 'mi');
    });

    if (filterRadius > 0) {
      sortedBusinesses = sortedBusinesses.filter((business) => (business.distance < filterRadius));
    }

    if (filterCategory !== "all") {
      sortedBusinesses = sortedBusinesses.filter((business) => (business.category === filterCategory));
    }

    sortedBusinesses.sort((a, b) => {
      return a.distance - b.distance;
    })
    
    setBusinessesToDisplay(sortedBusinesses);
  }

  const handleRadiusChange = (e) => {
    e.preventDefault();
    setFilterRadius(e.target.value);
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setFilterCategory(e.target.value);
  }

  return (
    <Container>
      <form className="form-inline business-filter-form">
        <label>Show me</label>
        <select className="category-select" onChange={handleCategoryChange}>
          <option value="all" selected>all businesses</option>
          <option value="cafe">cafes</option>
          <option value="bakery">bakeries</option>
          <option value="salon">salons</option>
          <option value="spa">spas</option>
        </select>
        <label>within</label>
        <select className="distance-select" onChange={handleRadiusChange}>
          <option value="0" selected>any distance</option>
          <option value="0.5">half a mile</option>
          <option value="1">1 mile</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="20">20 miles</option>
        </select>
       of {locationData.location}.
      </form>
      <Row className="mt-4">
        { (businessesToDisplay.length > 0) ? businessesToDisplay.map(business => {
          return (
            <Col md={6} className="mt-4">
              <Link to={`/business/${business.id}`} className="button-text w-inline-block">
                <div className="business-content-wrap" style={{ backgroundImage: `url(${business.imageURL})` }}>
                  <div className="business-content-card-wrap">
                    <div className="business-name-wrap"><p className="size3-link">{business.name}</p></div>
                    <div className="button-text w-inline-block">
                      <div className="button-location"><i className="fa fa-map-marker mr-1" />{business.location} · {Number(business.distance).toFixed(2) + " mi"}</div>
                      <div className="button-label mt-2">EXPLORE PRODUCTS<img src="/assets/img/Arrow%402x.svg" alt="" className="button-arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          )
        })
        : <Col>
            <div className="no-results">Sorry, we couldn't find any businesses matching your search criteria. Please try widening your search!</div>
          </Col>}
      </Row>
    </Container>
  )
}

export default BusinessGrid;