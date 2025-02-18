import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "./Auth/AuthInput";
import AuthError from "./Auth/AuthError";
import AuthButton from "./Auth/AuthButton";
import AuthLink from "./Auth/AuthLink";

import { postLogin } from "./utility/userUtility/postLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    postLogin(email, password, setError, setIsSuccess);
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-white rounded shadow"
      style={{ height: "70vh", width: "50vw" }}
    >
      {/* For login form */}
      <div
        className="h-100 d-flex flex-column justify-content-center align-items-center p-5"
        style={{ width: "60%" }}
      >
        <h2 className="text-center mb-4 fw-bold">Sign In</h2>

        <form
          onSubmit={handleLogin}
          className="w-100 d-flex flex-column align-items-center"
        >
          <div style={{ width: "100%" }}>
            <AuthInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ width: "100%" }}>
            <AuthInput
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <AuthError error={error} />}

          <AuthButton label="Login" />
        </form>
      </div>
      {/* For Redirecting to Register */}
      <div
        className="h-100 d-flex flex-column justify-content-center align-items-center p-4 text-white "
        style={{
          backgroundColor: "#384B70",
          width: "40%",
          borderTopLeftRadius: "2em",
          borderTopRightRadius: "0.25rem",
          borderBottomRightRadius: "0.35rem",
          borderBottomLeftRadius: "2em",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Hello Friends!</h2>
        <p className="text-center">
          Join us and start your journey with us today!
        </p>
        <AuthLink label="Sign Up" path="/register" />
      </div>
    </div>
  );
};

export default LoginForm;
