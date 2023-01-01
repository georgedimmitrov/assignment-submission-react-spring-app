import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import ajax from "../services/fetchService";
import { useLocalStorage } from "../util/useLocalStorage";

const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [assignments, setAssignments] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignments) => {
      setAssignments(assignments);
    });
  }, [jwt]);

  function logout() {
    setJwt(null);
    navigate(0);
  }

  return (
    <Container style={{ margin: "2em" }}>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="link" onClick={() => logout()}>
            Log out
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Code Reviewer Dashboard</h2>
        </Col>
      </Row>

      {assignments ? (
        <div
          className="d-grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
        >
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <Card.Body>
                <Card.Title>Assignment #{assignment.number}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <Badge pill bg="info" style={{ fontSize: "0.9em" }}>
                    {assignment.status}
                  </Badge>
                </Card.Subtitle>
                <Card.Text>
                  <span style={{ display: "block" }}>
                    <strong>Github URL:</strong> {assignment.githubUrl}
                  </span>
                  <span style={{ display: "block" }}>
                    <strong>Branch:</strong> {assignment.branch}
                  </span>
                </Card.Text>
                <Link to={`/assignments/${assignment.id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CodeReviewerDashboard;
