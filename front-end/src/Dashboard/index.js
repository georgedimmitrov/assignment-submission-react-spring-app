import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import ajax from "../services/fetchService";
import { useLocalStorage } from "../util/useLocalStorage";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";

const Dashboard = () => {
  const user = useUser();
  const [assignments, setAssignments] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ajax("api/assignments", "GET", user.jwt).then((assignments) => {
      setAssignments(assignments);
    });
  }, [user.jwt]);

  function createAssignment() {
    ajax("api/assignments", "POST", user.jwt, {
      username: "jorka",
      password: "asdfasdf",
    }).then((assignment) => {
      navigate(`/assignments/${assignment.id}`);
    });
  }

  function logout() {
    user.setJwt(null);
    navigate(0);
  }

  return (
    <div style={{ margin: "2em" }}>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="link" onClick={() => logout()}>
            Log out
          </Button>
        </Col>
      </Row>
      <Button className="mb-3" size="lg" onClick={() => createAssignment()}>
        Submit New Assignment
      </Button>

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
                  <StatusBadge text={assignment.status}></StatusBadge>
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
    </div>
  );
};

export default Dashboard;
