import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const BusinessGrid = ({ businesses }) => {

  return (
    <Container>
      <Row className="mt-4">
        {businesses.map(business => {
          return (
            <Col md={6} className="mt-4">
              <Link to={`/business/${business.id}`} className="button-text w-inline-block">
                <div className="business-content-wrap" style={{ backgroundImage: `url(${business.imageURL})` }}>
                  <div className="business-content-card-wrap">
                    <div className="business-name-wrap"><p className="size3-link">{business.name}</p></div>
                    <div className="button-text w-inline-block">
                      <div className="button-label">EXPLORE PRODUCTS<img src="/assets/img/Arrow%402x.svg" alt="" className="button-arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default BusinessGrid;