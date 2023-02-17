import React from 'react';
import { Form, Button } from 'react-bootstrap';

function FormTab() {
  return (
    <div>
      <h2>Form Unit Test</h2>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Game:</Form.Label>
          <Form.Control type="text" placeholder="Enter Game" />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" placeholder="Enter description" />
        </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default FormTab;
