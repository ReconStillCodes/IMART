import React from "react";

const AuthButton = ({ label }) => {
  return (
    <button
      type="submit"
      className=" p-2 btn btn-primary mt-3 mb-3 rounded-pill"
      style={{ backgroundColor: "#384B70", border: "none", width: "200px" }}
    >
      <b>{label}</b>
    </button>
  );
};

export default AuthButton;
