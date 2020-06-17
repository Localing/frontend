import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const BusinessGrid = ({ businesses }) => {
    
    const renderBusinesses = () => {
        const businessesToDisplay = [...businesses];
        const numberPerRow = 2;
        let rows = [];
    
        while (businessesToDisplay.length) {
          rows.push(businessesToDisplay.splice(0, numberPerRow));
        }
    
        return rows.map(row => (
          <Row className="mt-4">{row.map(business => 
            <Col md className="mt-4">
              <div className="business-content-wrap" style={{ backgroundImage: `url(${business.imageURL})` }}>
                <div className="business-content-card-wrap">
                  <div className="business-name-wrap"><Link to={`/business/${business.id}`} className="size3-link">{business.name}</Link></div>
                  <Link to={`/business/${business.id}`} className="button-text w-inline-block">
                    <div className="button-label">EXPLORE PRODUCTS<img src="/assets/img/Arrow%402x.svg" alt="" className="button-arrow" /></div></Link>
                </div>
              </div>
            </Col>
        )}</Row>
        ))
      }

      return (
        <Container>
            {renderBusinesses()}
        </Container>
      )
}

export default BusinessGrid;