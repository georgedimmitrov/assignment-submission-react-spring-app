import React, { useEffect, useRef, useState } from "react";
import {
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
import CommentContainer from "../CommentContainer";
import ajax from "../services/fetchService";
import StatusBadge from "../StatusBadge";
import { useUser } from "../UserProvider";

const AssignmentView = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { id } = useParams();
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
    codeReviewVideoUrl: "",
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
    ajax(`/api/assignments/${id}`, "PUT", user.jwt, assignment).then(
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
    ajax(`/api/assignments/${id}`, "GET", user.jwt).then(
      (assignmentResponse) => {
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
      }
    );
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
              <StatusBadge text={assignment.status}></StatusBadge>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextAssignmentNumber"
          >
            <Form.Label column sm="3" md="2">
              Assignment Number
            </Form.Label>
            <Col sm="9" md="8">
              <DropdownButton
                as={ButtonGroup}
                variant={"info"}
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an Assignment"
                }
                onSelect={(selectedElement) => {
                  updateAssignment("number", selectedElement);
                }}
              >
                {assignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item
                    key={assignmentEnum.assignmentNum}
                    eventKey={assignmentEnum.assignmentNum}
                  >
                    {assignmentEnum.assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
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
                onChange={(e) => updateAssignment("branch", e.target.value)}
              />
            </Col>
          </Form.Group>

          {assignment.status === "Completed" ? (
            <>
              <Form.Group
                as={Row}
                className="mb-3 d-flex align-items-center"
                controlId="codeReviewVideoUrl"
              >
                <Form.Label column sm="3" md="2">
                  Code Review Video URL
                </Form.Label>
                <Col sm="9" md="8">
                  <a href={assignment.codeReviewVideoUrl}>
                    {assignment.codeReviewVideoUrl}
                  </a>
                </Col>
              </Form.Group>
              <div className="d-flex gap-3">
                <Button variant="secondary" size="lg" onClick={() => back()}>
                  Back
                </Button>
              </div>
            </>
          ) : assignment.status === "Pending Submission" ? (
            <div className="d-flex gap-3">
              <Button size="lg" onClick={() => save("Submitted")}>
                Submit Assignment
              </Button>
              <Button variant="secondary" size="lg" onClick={() => back()}>
                Back
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-3">
              <Button size="lg" onClick={() => save("Resubmitted")}>
                Resubmit Assignment
              </Button>
              <Button variant="secondary" size="lg" onClick={() => back()}>
                Back
              </Button>
            </div>
          )}
          <CommentContainer id={id} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;
