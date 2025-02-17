import React from "react";
import { Link } from "react-router-dom";

const RedirectProductLink = ({ productName }) => {
  return (
    <div className=" text-muted text-secondary fw-bold">
      <Link
        to={"/products"}
        className="text-decoration-none text-muted text-secondary"
      >
        Products
      </Link>{" "}
      / <span className="fw-bold text-dark">{productName}</span>
    </div>
  );
};

export default RedirectProductLink;
