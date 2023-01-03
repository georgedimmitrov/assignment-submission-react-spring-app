import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocalStorage } from "../util/useLocalStorage";
import { useUser } from "../UserProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();
  const navigate = useNavigate();

  function onLogin() {
    const reqBody = {
      username,
      password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else {
          return Promise.reject("Invalid login attempt!");
        }
      })
      .then(([body, headers]) => {
        user.setJwt(headers.get("authorization"));
        // navigate("/dashboard");
        window.location.href = "/dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }

  function onLogout() {
    navigate("/");
  }

  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="Type in your username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Type in your password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8" lg="6" className="d-flex flex-column gap-2 flex-md-row">
            <Button id="submit" type="button" onClick={() => onLogin()}>
              Login
            </Button>
            <Button
              variant="secondary"
              id="submit"
              type="button"
              onClick={() => onLogout()}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
