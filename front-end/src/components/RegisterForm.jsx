import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthInput from "./Auth/AuthInput";
import AuthError from "./Auth/AuthError";
import AuthButton from "./Auth/AuthButton";
import AuthLink from "./Auth/AuthLink";
import AuthTextArea from "./Auth/AuthTextArea";

import { postUser } from "./utility/userUtility/postUser";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    //Validate Password
    if (password != confirm) {
      setError("Passwords do not match");
      return;
    }

    postUser(
      username,
      email,
      password,
      address,
      "user",
      setError,
      setIsSuccess
    );

    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-white rounded shadow"
      style={{ height: "70vh", width: "50vw" }}
    >
      {/* For Redirecting to Register */}
      <div
        className="h-100 d-flex flex-column justify-content-center align-items-center p-4 text-white "
        style={{
          backgroundColor: "#384B70",
          width: "40%",
          borderTopLeftRadius: "0.25rem",
          borderTopRightRadius: "2em",
          borderBottomRightRadius: "2em",
          borderBottomLeftRadius: "0.25rem",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Welcome Back!</h2>
        <p className="text-center">
          Please Login to continue with your journey
        </p>
        <AuthLink label="Sign In" path="/login" />
      </div>

      {/* For Register form */}
      <div
        className="h-100 d-flex flex-column justify-content-center align-items-center p-5"
        style={{ width: "60%" }}
      >
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>
        <form
          onSubmit={handleRegister}
          className="w-100 d-flex flex-column align-items-center"
        >
          <div style={{ width: "100%" }}>
            <AuthInput
              label="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ width: "100%" }}>
            <AuthInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-flex flex-row gap-3" style={{ width: "100%" }}>
            <div className=" w-50">
              <AuthInput
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className=" w-50">
              <AuthInput
                label="Confirm Password"
                type="password"
                name="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <AuthTextArea
              label="Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {error && <AuthError error={error} />}

          <AuthButton label="Register" />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
