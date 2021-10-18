import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";

import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const passwordIcon = <FontAwesomeIcon icon={faUserLock} />;

  return (
    <div className="register-form-parent">
      <Form className="col-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>{emailIcon}</InputGroup.Text>
            <Form.Control type="email" placeholder="Enter email" />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Name</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>{userIcon}</InputGroup.Text>
            <Form.Control type="text" placeholder="First name" />
            <Form.Control type="text" placeholder="Last name" />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>{passwordIcon}</InputGroup.Text>
            <Form.Control type="password" placeholder="Password" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>{passwordIcon}</InputGroup.Text>
            <Form.Control type="password" placeholder="Confirm password" />
          </InputGroup>
        </Form.Group>

        <Button className="col-12" variant="primary" type="submit">
          Create New Account
        </Button>
        <p className="text-muted font-weight-bold text-center">
          Already have an Account?{" "}
          <Link to="/login" className="text-primary ml-2 nodecoration">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}
