import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const BusinessGrid = ({ businesses }) => {
    
    const renderBusinesses = () => {
        let businessesToDisplay = businesses;
        let rows = [];
    
        while (businessesToDisplay.length) {
          rows.push(businessesToDisplay.splice(0, 2));
        }
    
        return rows.map(row => (
          <Row className="mt-4">{row.map(business => 
            <Col md>
              <div className="business-content-wrap">
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