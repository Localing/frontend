import React from 'react';
import { Popover, Button, Form, Alert, Spinner } from "react-bootstrap";

const PostcodePopover = (props) =>{
 return (
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
}

  export default PostcodePopover;