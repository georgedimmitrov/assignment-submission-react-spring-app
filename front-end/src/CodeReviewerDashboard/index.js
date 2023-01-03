import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import ajax from "../services/fetchService";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";

const CodeReviewerDashboard = () => {
  const user = useUser();
  const [assignments, setAssignments] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.jwt) {
      navigate("/login");
    }
  });

  useEffect(() => {
    ajax("api/assignments", "GET", user.jwt).then((assignments) => {
      setAssignments(assignments);
    });
  }, [user.jwt]);

  function logout() {
    user.setJwt(null);
    navigate(0);
    // navigate("/", { reload: true });
  }

  function claimAssignment(assignment) {
    const decodedJwt = jwt_decode(user.jwt);
    assignment.codeReviewer = {
      username: decodedJwt.sub,
    };
    assignment.status = "In Review";
    ajax(`api/assignments/${assignment.id}`, "PUT", user.jwt, assignment).then(
      (updatedAssignment) => {
        const assignmentsCopy = [...assignments];
        const index = assignmentsCopy.findIndex(
          (assignment) => assignment.id === updatedAssignment.id
        );
        assignmentsCopy[index] = updatedAssignment;
        setAssignments(assignmentsCopy);
      }
    );
  }

  function editReview(assignment) {
    navigate(`/assignments/${assignment.id}`);
  }

  function viewAssignment(assignment) {
    navigate(`/assignments/${assignment.id}`);
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
          <h2 className="mb-4">Code Reviewer Dashboard</h2>
        </Col>
      </Row>

      <div className="assignment-wrapper in-review">
        <h4 className="px-2 assignment-wrapper-title">In Review</h4>

        {assignments &&
        assignments.filter((assignment) => assignment.status === "In Review")
          .length > 0 ? (
          <div
            className="d-grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "In Review")
              .map((assignment) => (
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

                    <Button
                      onClick={() => editReview(assignment)}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found.</div>
        )}
      </div>

      <div className="assignment-wrapper submitted">
        <h4 className="px-2 assignment-wrapper-title">Awaiting Review</h4>
        {assignments &&
        assignments.filter(
          (assignment) =>
            assignment.status === "Submitted" ||
            assignment.status === "Resubmitted"
        ).length > 0 ? (
          <div
            className="d-grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments
              .filter(
                (assignment) =>
                  assignment.status === "Submitted" ||
                  assignment.status === "Resubmitted"
              )
              .sort((a, b) => {
                if (a.status === "Resubmitted") {
                  return -1;
                } else {
                  return 1;
                }
              })
              .map((assignment) => (
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

                    <Button
                      onClick={() => claimAssignment(assignment)}
                      variant="secondary"
                    >
                      Claim
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found.</div>
        )}
      </div>

      <div className="assignment-wrapper needs-update">
        <h4 className="px-2 assignment-wrapper-title">Needs Update</h4>

        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div
            className="d-grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
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

                    <Button
                      onClick={() => viewAssignment(assignment)}
                      variant="secondary"
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found.</div>
        )}
      </div>
    </Container>
  );
};

export default CodeReviewerDashboard;
