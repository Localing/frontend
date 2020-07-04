import React, { useEffect, useState } from 'react';
import { Col, Row, Container, OverlayTrigger, Popover, Button, Form, Alert, Spinner } from "react-bootstrap";
import { getDistance, convertDistance } from 'geolib';
import { capitalize } from "../../helpers/strings";
import { Link } from "react-router-dom";

const BusinessGrid = ({ businesses, locationData, setLocation, clearLocationError }) => {

  const [businessesToDisplay, setBusinessesToDisplay] = useState([...businesses]);
  const [filterRadius, setFilterRadius] = useState(0);
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // sort and filter businesses whenever options change
    sortBusinesses();
  }, [locationData, filterRadius, filterCategory, searchTerm])

  useEffect(() => {
    // update categories if businesses change
    getCategories();
  }, [businesses])

  const sortBusinesses = () => {
    let sortedBusinesses = [...businesses];

    sortedBusinesses.forEach((business) => {
      const distanceInMeters = getDistance({ latitude: locationData.latitude, longitude: locationData.longitude }, { latitude: business.latitude, longitude: business.longitude });
      business.distance = convertDistance(distanceInMeters, 'mi');
    });

    if (searchTerm) {
      sortedBusinesses = sortedBusinesses.filter((business) => (business.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }

    if (filterRadius > 0) {
      sortedBusinesses = sortedBusinesses.filter((business) => (business.distance < filterRadius));
    }

    if (filterCategory !== "all") {
      sortedBusinesses = sortedBusinesses.filter((business) => (business.categories.includes(filterCategory)));
    }

    sortedBusinesses.sort((a, b) => {
      return a.distance - b.distance;
    })

    setBusinessesToDisplay(sortedBusinesses);

  }

  // filter by radius
  const handleRadiusChange = (e) => {
    e.preventDefault();
    setFilterRadius(e.target.value);
  }


  // get categories we can filter by
  const getCategories = () => {
    let categories = [];
    businesses.forEach((business) => {
      categories = categories.concat(business.categories);
    })
    setCategories(categories);
  }


  // filter by category
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setFilterCategory(e.target.value);
  }

  // business search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }



  // allow changing postcode
  const [postcode, setPostcode] = useState("");

  const handlePostcodeSubmit = (event) => {
    event.preventDefault();

    // strip any whitespace out of postcode
    const newPostcode = postcode.replace(/\s+/g, '');
    setLocation(newPostcode);

  }

  // popover used to change postcode
  const PostcodePopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Change Location</Popover.Title>
      <Popover.Content>
        <Form onSubmit={handlePostcodeSubmit}>
          <Form.Group controlId="postcodeForm">
            {locationData.locationError &&
              <Alert variant="danger" onClose={() => clearLocationError()} dismissible>
                <p>The postcode you entered wasn't valid.</p>
              </Alert>
            }

            <Form.Control
              type="text"
              placeholder="UK Postcode"
              name="postcode"
              value={postcode}
              onChange={e => setPostcode(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {locationData.loading &&
              <Spinner animation="border" role="status" size="sm">
              </Spinner>
            }
               Change
               </Button>
        </Form>
      </Popover.Content>
    </Popover>
  );


  return (
    <Container>
      <hr />
      {(locationData.location) ?
        <form className="form-inline business-filter-form">
          <label>Show me</label>
          <select className="custom-select ml-1 mr-1" onChange={handleCategoryChange}>
            <option value="all" selected>all shops</option>
            {categories.map((category) => {
              return <option value={category}>{category}</option>
            })}
          </select>
          <label>within</label>
          <select className="custom-select ml-1 mr-1" onChange={handleRadiusChange}>
            <option value="0" selected>any distance</option>
            <option value="0.5">half a mile</option>
            <option value="1">1 mile</option>
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="20">20 miles</option>
          </select>
          <label>of</label>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={PostcodePopover}
            rootClose>
            <select className="custom-select ml-1 mr-1" onMouseDown={(e) => e.preventDefault()}>
              <option>{locationData.location}</option>
            </select>
          </OverlayTrigger>
          <label>or&nbsp;</label>
          <input className="form-control" type="text" placeholder="search by name" onChange={handleSearch} />
        </form>
        :
        <div className="business-filter-form">Please
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={PostcodePopover}
            rootClose>
            <button className="location-filter" onClick={(e) => e.preventDefault()}>set a location</button>
          </OverlayTrigger>to find businesses near you.
        </div>
      }
      <Row className="mt-4">
        {(businessesToDisplay.length > 0) ? businessesToDisplay.map(business => {
          return (
            <Col md={6} className="mt-4">
              <Link to={`/business/${business.businessId}`} className="button-text w-inline-block">
                <div className="business-content-wrap" style={{ backgroundImage: `url(${business.imageURL})` }}>
                  <div className="business-content-card-wrap">
                  <div className="button-category">{business.categories.map((category) => <span className="mr-1">{capitalize(category)}</span>)}</div>
                    <div className="business-name-wrap"><p className="size3-link">{business.name}</p></div>
                    <div className="button-text w-inline-block">
                      <div className="button-location"><i className="fa fa-map-marker mr-1" />{capitalize(business.area)} · {Number(business.distance).toFixed(1) + " miles away"}</div>
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
      <hr />
    </Container>
  )
}

export default BusinessGrid;