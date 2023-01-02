import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ajax from "../services/fetchService";
import { useLocalStorage } from "../util/useLocalStorage";

const CodeReviewAssignmentView = () => {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const { id } = useParams();
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const prevAssignmentValue = useRef(assignment);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save(status) {
    if (status && assignment.status !== status) {
      updateAssignment("status", status);
    } else {
      persist();
    }
  }

  function persist() {
    ajax(`/api/assignments/${id}`, "PUT", jwt, assignment).then(
      (assignment) => {
        setAssignment(assignment);
      }
    );
  }

  function back() {
    navigate("/dashboard");
  }

  useEffect(() => {
    if (prevAssignmentValue.current.status !== assignment.status) {
      persist();
    }
    prevAssignmentValue.current = assignment;
  }, [assignment]);

  useEffect(() => {
    ajax(`/api/assignments/${id}`, "GET", jwt).then((assignmentResponse) => {
      const assignment = assignmentResponse.assignment;
      if (!assignment.branch) {
        assignment.branch = "";
      }
      if (!assignment.githubUrl) {
        assignment.githubUrl = "";
      }
      setAssignment(assignment);
      setAssignmentEnums(assignmentResponse.assignmentEnums);
      setAssignmentStatuses(assignmentResponse.statusEnums);
    });
  }, []);

  return (
    <Container>
      <Row className="d-flex align-items-center">
        <Col>
          {assignment && assignment.number && assignmentEnums.length > 0 ? (
            <>
              <h1>Assignment {assignment.number}</h1>
              <h4>{assignmentEnums[assignment.number - 1].assignmentName}</h4>
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextStatus">
            <Form.Label column sm="3" md="2">
              Status:
            </Form.Label>
            <Col sm="9" md="8" className="d-flex align-items-center">
              <Badge pill bg="info" style={{ fontSize: "0.9em" }}>
                {assignment.status}
              </Badge>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextGithubUrl"
          >
            <Form.Label column sm="3" md="2">
              Github URL
            </Form.Label>
            <Col sm="9" md="8">
              <Form.Control
                type="url"
                placeholder="https://github.com/username/url"
                value={assignment.githubUrl}
                readOnly
                disabled
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextBranch">
            <Form.Label column sm="3" md="2">
              Branch
            </Form.Label>
            <Col sm="9" md="8">
              <Form.Control
                type="url"
                placeholder="example_branch_name"
                value={assignment.branch}
                readOnly
                disabled
                onChange={(e) => updateAssignment("branch", e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextGithubUrl"
          >
            <Form.Label column sm="3" md="2">
              Video Review URL
            </Form.Label>
            <Col sm="9" md="8">
              <Form.Control
                type="url"
                placeholder="https://screencast-o-matic.com/url"
                value={assignment.codeReviewVideoUrl}
                onChange={(e) =>
                  updateAssignment("codeReviewVideoUrl", e.target.value)
                }
              />
            </Col>
          </Form.Group>

          <div className="d-flex gap-3">
            {assignment.status === "Completed" ? (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => save(assignmentStatuses[2].status)}
              >
                Re-Claim
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => save(assignmentStatuses[4].status)}
              >
                Complete Review
              </Button>
            )}

            {assignment.status === "Needs Update" ? (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => save(assignmentStatuses[2].status)}
              >
                Re-Claim
              </Button>
            ) : (
              <Button
                size="lg"
                variant="danger"
                onClick={() => save(assignmentStatuses[3].status)}
              >
                Reject Assignment
              </Button>
            )}

            <Button variant="secondary" size="lg" onClick={() => back()}>
              Back
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CodeReviewAssignmentView;
