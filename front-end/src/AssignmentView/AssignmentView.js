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

const AssignmentView = () => {
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

  function save() {
    if (assignment.status === assignmentStatuses[0].status) {
      updateAssignment("status", assignmentStatuses[1].status);
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

          <div className="d-flex gap-3">
            <Button size="lg" onClick={() => save()}>
              Submit Assignment
            </Button>
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

export default AssignmentView;
