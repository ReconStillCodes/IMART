import React from "react";
import { Link } from "react-router-dom";

const AuthLink = ({ label, path }) => {
  return (
    <Link
      to={path}
      className="text-decoration-none p-2 btn btn-primary mt-3 mb-3 rounded-pill fw-bold"
      style={{
        backgroundColor: "#384B70",
        border: "3px solid white",
        width: "200px",
      }}
    >
      {label}
    </Link>
  );
};

export default AuthLink;
