import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserLock } from "@fortawesome/free-solid-svg-icons";
import {Jumbo} from "../Jumbo/Jumbo";

import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const passwordIcon = <FontAwesomeIcon icon={faUserLock} />;
  return (
    <>
      <Jumbo />
      <div className="login-title">
        <h1>Login</h1>
      </div>
      <div className="login-form-parent">
        <Form className="login-form">
          <Form.Group className="m-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text className="text-icon">{emailIcon}</InputGroup.Text>
              <Form.Control type="email" placeholder="Enter email" />
            </InputGroup>
          </Form.Group>

          <Form.Group className="m-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text className="text-icon">{passwordIcon}</InputGroup.Text>
              <Form.Control type="password" placeholder="Password" />
            </InputGroup>
          </Form.Group>
          <Form.Group className="m-3" controlId="loginSubmit">
            <Button className="w-100" variant="primary" type="submit">
              Login
            </Button>
            <p className="text-muted font-weight-bold text-center">
              Need an Account?{" "}
              <Link to="/register" className="text-primary ml-2 nodecoration">
                Register
              </Link>
            </p>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}