import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Support = (props) => {

    const openAgent = () => {
        const dfMessenger = document.querySelector('df-messenger');
        dfMessenger.setAttribute("expand", "true");
    }
    
    return (
        <Fragment>
            <MetaTags>
                <title>Localing | Customer Support</title>
                <meta
                    name="description"
                    content="Localing Customer Support"
                />
            </MetaTags>
            <LayoutOne>
                <Container className="mt-3 mb-3">
                    <h1 className="mt-2 mb-2">Customer Support</h1>
                    <Row className="mt-3">
                        <Col md={5} className="text-center mt-2">
                            <img onClick={openAgent} src={process.env.PUBLIC_URL + '/assets/img/katy-logo.png'} width="250" className="mx-auto" style={{ cursor: 'pointer' }} />
                            <p className="lead mt-2 d-none d-md-block">Our community assistant is available 24/7 to help you.</p>
                        </Col>
                        <Col className="mt-2">
                            <p className="lead">Sorry to hear you’ve been having issues!</p>

                            <p>We hope our <Link to="/faqs" style={{ textDecoration: 'underline' }}>FAQs page</Link> is able to help untie those knots of confusion, but if not, please feel free to have a chat with our <a onClick={openAgent} style={{ textDecoration: 'underline' }}>Community Assistant</a>.</p>

                            <p>If you’ve found a gap in our knowledge, or just need a bit of a personal touch, we would love to hear from you at <u>support@localing.co.uk</u>.</p>

                            <p>We really believe that your community can work together to bring new life back to your local businesses, so they can come back stronger and better than ever. If you have any suggestions on what we can work on to help you support your community more, any feedback to <u>feedback@localing.co.uk</u> would be greatly appreciated!</p>
                            
                            <Link to="/faqs"><Button variant="outline-dark" style={{ borderRadius: '0' }}>FAQs</Button></Link>
                            <Button variant="outline-dark" className="ml-2" style={{ borderRadius: '0' }} onClick={openAgent}>Ask Katy</Button>
                            <Link to="/contact"><Button variant="outline-dark" className="ml-2" style={{ borderRadius: '0' }}>Contact Us</Button></Link>
                        </Col>
                    </Row>
                </Container>
            </LayoutOne>
        </Fragment >
    )
}

export default Support;