import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
    <Container>
        <Row>
            <div className="mx-auto mt-5 text-center">
                <h2>Welcome to Localing</h2>
                <p>Loading your local businesses...</p>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        </Row>
    </Container>
    )
}

export default Loading;