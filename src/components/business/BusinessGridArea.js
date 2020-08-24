import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from "react-bootstrap";
import { capitalize } from "../../helpers/strings";
import { Link } from "react-router-dom";
import Paginator from "react-hooks-paginator";

// Business Grid used on the page for a particular area

const BusinessGridArea = ({ businesses, locationData, area }) => {

  const [businessesToDisplay, setBusinessesToDisplay] = useState([...businesses]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfBusinesses, setNumberOfBusinesses] = useState(0);
  const pageLimit = 6; // businesses per page
  

  useEffect(() => {

    businesses = businesses.filter((business) => (business.area === area));

    // sort and filter businesses whenever options change
    const sortBusinesses = () => {
      let sortedBusinesses = [...businesses];

      if (searchTerm) {
        sortedBusinesses = sortedBusinesses.filter((business) => (business.name.toLowerCase().includes(searchTerm.toLowerCase())));
      }

      if (filterCategory !== "all") {
        sortedBusinesses = sortedBusinesses.filter((business) => (business.categories.includes(filterCategory)));
      }

      setNumberOfBusinesses(sortedBusinesses.length);
      setBusinessesToDisplay(sortedBusinesses.slice(offset, offset + pageLimit));
    }

    sortBusinesses();
  }, [locationData, filterCategory, searchTerm, businesses, offset])

  useEffect(() => {
    // update categories if businesses change
    const getCategories = () => {
      let categories = [];
      businesses.forEach((business) => {
        if(business.categories) categories = categories.concat(business.categories);
      })
      setCategories(categories);
    }

    getCategories();
  }, [businesses])

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

  return (
    <Container>
      <br />
        <form className="form-inline business-filter-form">
          <label className="ml-1 mr-1">Show me</label>
          <select className="custom-select ml-1 mr-1" onChange={handleCategoryChange} style={{ borderRadius: '0' }}>
            <option value="all" selected>all shops</option>
            {categories.map((category) => {
              return <option value={category}>{category}</option>
            })}
          </select>
          <label className="ml-1 mr-1">or&nbsp;</label>
          <input className="form-control ml-1 mr-1 shop-search-box" type="text" placeholder="search by shop name" onChange={handleSearch} style={{ borderRadius: '0' }} />
        </form>
      <Row className="mt-4">
        {businessesToDisplay && businessesToDisplay.length ?

          businessesToDisplay.map(business => {
            return (
              <Col md={6} className="mt-4">
                <Link to={`/business/${business.businessId}`} className="button-text w-inline-block">
                  <div className="business-content-wrap" style={{ backgroundImage: `url(${business.imageURL})` }}>
                    <div className="business-content-card-wrap">
                      <div className="button-category">{business.categories && business.categories.map((category) => <span className="mr-1">{capitalize(category)}</span>)}</div>
                      <div className="business-name-wrap"><p className="size3-link">{business.name}</p></div>
                      <div className="button-text w-inline-block">
                        <div className="button-location"><i className="fa fa-map-marker mr-1" />{capitalize(business.area)} {/* Number(business.distance).toFixed(1) + " miles away" */}</div>
                        <div className="button-label mt-2">EXPLORE DEALS<img src="/assets/img/Arrow%402x.svg" alt="" className="button-arrow" />
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
      {businessesToDisplay.length &&
        <div className="pro-pagination-style text-center mt-30">
          <Paginator
            totalRecords={numberOfBusinesses}
            pageLimit={pageLimit}
            pageNeighbours={1}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageContainerClass="mb-0 mt-0"
            pagePrevText="«"
            pageNextText="»"
          />
        </div>
      }
      <hr />
    </Container>
  )
}

export default BusinessGridArea;