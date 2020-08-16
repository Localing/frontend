import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { deleteAllFromCart } from "../../redux/actions/cartActions";

const CheckoutCancel = ({ clearCart }) => {

    useEffect(() => {
        clearCart();
    }, []);

    return (

        <Fragment>
            <MetaTags>
                <title>Localing | Checkout Cancelled</title>
                <meta
                    name="description"
                    content="Localing Checkout Cancelled"
                />
            </MetaTags>

            <LayoutOne>
                <Container className="mt-5 mb-5">
                    <Jumbotron className="text-center">
                        <h2>Your order was cancelled.</h2>
                        <p className="lead mt-3 mb-3">Please <Link to="/support" style={{ textDecoration: 'underline' }}>reach out to us</Link> if there is anything we can help with!</p>
                        <Button variant="outline-dark"><Link to="/">Continue Shopping</Link></Button>
                    </Jumbotron>
                </Container>
            </LayoutOne>
        </Fragment>

    )

};

const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => {
            dispatch(deleteAllFromCart());
        }
    };
};

export default connect(null, mapDispatchToProps)(CheckoutCancel);