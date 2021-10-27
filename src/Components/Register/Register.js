import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { Jumbo } from "../Jumbo/Jumbo";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver  } from '@hookform/resolvers/yup';

import regSchema from '../../schemas/register.schema';

import "./Register.css";

export const Register = () => {
  const userIcon = <FontAwesomeIcon icon={faUser} />;
  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const passwordIcon = <FontAwesomeIcon icon={faUserLock} />;

  const [regEmail, setRegEmail] = useState("");
  const [regFName, setRegFName] = useState("");
  const [regLName, setRegLName] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConf, setRegConf] = useState("");

  const {register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(regSchema),
  });

  const submitForm = (data) => {
    console.log(data);
  }

  return (
    <>
      <Jumbo />
      <div className="register-title">
        <h1>Register</h1>
      </div>
      <div className="register-info">
        <p>Please enter in the following details to register a new account.</p>
      </div>
      <div className="register-form-parent">
        <form className="register-form" onSubmit={handleSubmit(submitForm)}>
          <div className="reg-form-group">
            <label>Email address</label>
            <div className="reg-form-grouping">
              <label className="text-icon">
                {emailIcon}
              </label>
              <input
                id="registerEmail"
                name="email"
                type="email"
                {...register('email', { required: true })}
                value={regEmail}
                onChange={(e)=>setRegEmail(e.target.value)}
               placeholder="Enter email"
              />
            </div>
            <div className="reg-form-errors">{errors.email && <p>Please enter a valid Email Address.</p>}</div>
          </div>

          <div className="reg-form-group">
            <label>First Name</label>
            <div className="reg-form-grouping">
              <label className="text-icon">
                {userIcon}
              </label>
              <input
                id="registerFName"
                type="text"
                name="firstName"
                {...register('firstName', { required: true })}
                value={regFName}
                onChange={(e)=>setRegFName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div className="reg-form-errors">{errors.firstName && <p>Please enter a valid First Name.</p>}</div>
          </div>


          <div className="reg-form-group">
            <label>Last Name</label>
            <div className="reg-form-grouping">
              <label className="text-icon">
                {userIcon}
              </label>
              <input
                id="registerLName"
                type="text"
                name="lastName"
                {...register('lastName', { required: true })}
                value={regLName}
                onChange={(e)=>setRegLName(e.target.value)}
                placeholder="Last name"
              />
            </div>
            <div className="reg-form-errors">{errors.lastName && <p>Please enter a valid Last Name.</p>}</div>
          </div>


          <div className="reg-form-group">
            <label>Password</label>
            <div className="reg-form-grouping">
              <label className="text-icon">
                {passwordIcon}
              </label>
              <input
                id="registerPassword"
                name="password"
                type="password"
                {...register('password', { required: true })}
                value={regPass}
                onChange={(e)=>setRegPass(e.target.value)}
               placeholder="Password"
              />
            </div>
            <div className="reg-form-grouping">
              <label className="text-icon">
                {passwordIcon}
              </label>
              <input
                id="registerConfirm"
                name="confirmPassword"
                type="password"
                {...register('confirmPassword', { required: true })}
                value={regConf}
                onChange={(e)=>setRegConf(e.target.value)}
                placeholder="Confirm password"
              />
            </div>
            {errors.password && <div className="reg-form-errors"><p>Please enter a password with more than 3 characters.</p></div>}
            <div className="reg-form-errors">{!errors.password && errors.confirmPassword && <p>Passwords do not match.</p>}</div>
          </div>
 
          <div className="reg-form-group">
            <button className="btnCoffee register-form-btn" type="submit">
              Create New Account
            </button>
            <p className="mt-3 text-muted font-weight-bold text-center">
              Already have an Account?{" "}
              <Link to="/login" className="ml-2 nodecoration">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
