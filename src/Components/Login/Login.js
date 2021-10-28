import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, setUser } from "../../redux/user.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { Jumbo } from "../Jumbo/Jumbo";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import jwt from "jsonwebtoken";

import loginSchema from "../../schemas/login.schema";

import "./Login.css";
import api from "../../api/auth.api";
import "../../constants/api";

export const Login = () => {
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const passwordIcon = <FontAwesomeIcon icon={faUserLock} />;

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  const [loginServerErrors, setLoginServerError] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const validToken = (token) => {
    if (token.payload) {
      let exp = new Date(token.payload.exp * 1000);
      let now = new Date();
      if (exp > now) {
        return true;
      } else {
        return false;
      }
    }
  };

  const submitForm = async (formData) => {
    const user = {
      email: formData.email,
      password: formData.password,
    };

    let userToken = "";
    try {
      const response = await api.post("/login", user);

      userToken = response;
    } catch (err) {
      if (err.response.data.errors) {
        return setLoginServerError(err.response.data.errors);
      } else {
        return setLoginServerError([err.response.data]);
      }
    }

    localStorage.setItem("access-token", userToken.data.token);
    let decodedToken = jwt.decode(userToken.data.token, { complete: true });
    if (validToken(decodedToken)) {
      await dispatch(setUser(decodedToken.payload));
      await dispatch(login());
      history.push("/yourlists");
    } else {
      localStorage.removeItem("access-token");
      dispatch(logout());
    }
  };

  return (
    <>
      <Jumbo />
      <div className="login-title">
        <h1>Login</h1>
      </div>
      <div className="login-info">
        <p>
          Please enter in your details so we can log you in to your account.
        </p>
      </div>
      <div className="login-form-parent">
        <form className="login-form" onSubmit={handleSubmit(submitForm)}>
          <div className="login-form-group">
            <label>Email address</label>
            <div className="login-form-grouping">
              <label className="text-icon">{emailIcon}</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="login-form-errors">
              {errors.email && <p>Please enter a valid Email Address.</p>}
            </div>
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <div className="login-form-grouping">
              <label className="text-icon">{passwordIcon}</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="login-form-errors">
              {errors.password && (
                <p>Please enter a password with more than 3 characters.</p>
              )}
            </div>
            <div className="login-form-server-errors">
              {loginServerErrors?.map((error) => {
                return <p key={error.id}>{error}</p>;
              })}
            </div>
          </div>

          <div className="login-form-group">
            <button className="btnCoffee login-form-btn" type="submit">
              Login
            </button>
            <p className="mt-3 text-muted font-weight-bold text-center">
              Need an Account?{" "}
              <Link to="/register" className="ml-2 nodecoration">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
