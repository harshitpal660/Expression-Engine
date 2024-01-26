// Importing necessary components and hooks from React and Bootstrap
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// Functional component for the expression form
const ExpressionForm = () => {
  // State variables to manage rules, combinator, and result visibility
  const [rules, setRules] = useState([
    { key: 'Age', output: { value: '', operator: '>', score: '' } },
  ]);
  const [combinator, setCombinator] = useState('and');
  const [showResult, setShowResult] = useState(false);

  // Function to handle input changes in the form
  const handleInputChange = (index, field, value) => {
    const updatedRules = [...rules];
    if (value === 'age' || value === 'credit_score' || value === 'account_balance') {
      updatedRules[index].key = value;
    } else {
      updatedRules[index].output[field] = value;
    }
    setRules(updatedRules);
  };

  // Function to add a new expression rule
  const addExpression = () => {
    setRules([...rules, { key: 'age', output: { value: '', operator: '>=', score: '' } }]);
  };

  // Function to delete an expression rule
  const deleteExpression = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const expressionData = {
      rules,
      combinator,
    };
    setShowResult(true);
    // You can send the data to the server or perform further actions here.
  };

  // JSX to render the component
  return (
    <Container className="mt-4">
      <Form>
        {rules.map((rule, index) => (
          <Row key={index} className="mb-3">
            <Col>
              <Form.Group controlId={`ruleType${index}`}>
                <Form.Label>Rule Type</Form.Label>
                <Form.Control
                  as="select"
                  value={rule.key}
                  onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                >
                  <option value="age">Age</option>
                  <option value="credit_score">Credit Score</option>
                  <option value="account_balance">Account Balance</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`operator${index}`}>
                <Form.Label>Operator</Form.Label>
                <Form.Control
                  as="select"
                  value={rule.output.operator}
                  onChange={(e) => handleInputChange(index, 'operator', e.target.value)}
                >
                  <option value=">">{'>'}</option>
                  <option value="<">{'<'}</option>
                  <option value=">=">{'>='}</option>
                  <option value="<=">{'<='}</option>
                  <option value="=">{'='}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`value${index}`}>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter value"
                  value={rule.output.value}
                  onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`score${index}`}>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter score"
                  value={rule.output.score}
                  onChange={(e) => handleInputChange(index, 'score', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col className="d-flex align-items-end">
              <Button variant="danger" onClick={() => deleteExpression(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))}
        <Form.Group controlId="combinator" className="mb-3">
          <Form.Label>Combinator</Form.Label>
          <Form.Control
            as="select"
            value={combinator}
            onChange={(e) => setCombinator(e.target.value)}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={addExpression} className="me-2">
          Add Expression
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>

        {/* Display result if showResult is true */}
        {showResult && (
          <div className="mt-3">
            <h3>Result:</h3>
            <Alert variant="info">
              {/* Display the JSON object */}
              <pre>{JSON.stringify({ rules, combinator }, null, 2)}</pre>
            </Alert>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default ExpressionForm;
