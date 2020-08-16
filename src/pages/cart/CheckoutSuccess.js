import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { deleteAllFromCart } from "../../redux/actions/cartActions";

const CheckoutSuccess = ({ clearCart }) => {

    useEffect(() => {
        clearCart();
    }, []);

    return (

        <Fragment>
            <MetaTags>
                <title>Localing | Checkout Success</title>
                <meta
                    name="description"
                    content="Localing Checkout Success"
                />
            </MetaTags>

            <LayoutOne>
                <Container className="mt-5 mb-5">
                    <Jumbotron className="text-center">
                        <h2>Your order was processed successfully! Thanks!</h2>
                        <p className="lead">Please check your email for a confirmation. If you don't recieve it, <Link to="/support" style={{ textDecoration: 'underline' }}>please contact us.</Link></p>
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

export default connect(null, mapDispatchToProps)(CheckoutSuccess);