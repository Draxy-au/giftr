import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserLock } from "@fortawesome/free-solid-svg-icons";

import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const passwordIcon = <FontAwesomeIcon icon={faUserLock} />;
  return (
    <div className="container m-2">
      <div className="col-md-7 col-lg-6 ml-auto">
        <form className="row g-3">
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Email Address
            </label>
            <div className="input-group">
              <div className="input-group-text">{emailIcon}</div>
              <input
                type="email"
                className="form-control"
                id="inputAddress"
                placeholder="someone@email.com"
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <div className="input-group">
              <div className="input-group-text">{passwordIcon}</div>
              <input
                type="password"
                className="form-control"
                id="inputAddress"
                placeholder="********"
              />
            </div>
          </div>
          <div className="col-12 mx-auto mb-0">
            <button
              type="submit"
              className="col-12 btn btn-primary btn-block py-2"
            >
              Login To Your Account
            </button>
          </div>
          <div className="text-center w-100">
            <p className="text-muted font-weight-bold">
              Not Signed Up?{" "}
              <Link to="/register" className="text-primary ml-2 nodecoration">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
