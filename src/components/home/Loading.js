import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
    <Container>
        <Row>
            <div className="mx-auto mt-5 mb-5 text-center" style={{ width: '500px'}}>
                <h2 className="size1-text">Keep the heart of your community's high street beating!</h2>
                <p class="lead">Pre-order from local businesses, and unlock exclusive promotions, discounts and rewards for being loyal to your community!</p>
                <hr />
                <h4>Loading your local businesses ...</h4>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        </Row>
    </Container>
    )
}

export default Loading;