import React, { useState } from "react";
//import bcrypt from "bcryptjs";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { Jumbo } from "../Jumbo/Jumbo";

import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const passwordIcon = <FontAwesomeIcon icon={faUserLock} />;

  const [regEmail, setRegEmail] = useState("");
  const [regFName, setRegFName] = useState("");
  const [regLName, setRegLName] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConf, setRegConf] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //const hash = bcrypt.hashSync(regPass, 10);
    console.log("pass:", regPass);
    //console.log("hash:", hash);
  }

  return (
    <>
      <Jumbo />
      <div className="register-title">
        <h1>Register</h1>
      </div>
      <div className="register-form-parent">
        <Form className="register-form" onSubmit={(e)=>handleSubmit(e)}>
          <Form.Group className="m-3">
            <Form.Label>Email address</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text className="text-icon">
                {emailIcon}
              </InputGroup.Text>
              <Form.Control
                id="registerEmail"
                type="email"
                value={regEmail}
                onChange={(e)=>setRegEmail(e.target.value)}
               placeholder="Enter email"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="m-3">
            <Form.Label>Your Name</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text className="text-icon">
                {userIcon}
              </InputGroup.Text>
              <Form.Control
                id="registerFName"
                type="text"
                value={regFName}
                onChange={(e)=>setRegFName(e.target.value)}
                placeholder="First name"
              />
              <Form.Control
                id="registerLName"
                className="ms-1"
                type="text"
                value={regLName}
                onChange={(e)=>setRegLName(e.target.value)}
                placeholder="Last name"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="m-3">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text className="text-icon">
                {passwordIcon}
              </InputGroup.Text>
              <Form.Control
                id="registerPassword"
                type="password"
                value={regPass}
                onChange={(e)=>setRegPass(e.target.value)}
               placeholder="Password"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="text-icon">
                {passwordIcon}
              </InputGroup.Text>
              <Form.Control
                id="registerConfirm"
                type="password"
                value={regConf}
                onChange={(e)=>setRegConf(e.target.value)}
                placeholder="Confirm password"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="m-3">
            <Button className="w-100" variant="primary" type="submit">
              Create New Account
            </Button>
            <p className="text-muted font-weight-bold text-center">
              Already have an Account?{" "}
              <Link to="/login" className="text-primary ml-2 nodecoration">
                Login
              </Link>
            </p>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
