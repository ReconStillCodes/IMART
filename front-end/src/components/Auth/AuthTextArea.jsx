import React from "react";

const AuthTextArea = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-3 ">
      <textarea
        name={name}
        className="w-100 form-control"
        placeholder={label}
        required
        value={value}
        onChange={onChange}
        style={{ resize: "none" }}
      />
    </div>
  );
};

export default AuthTextArea;
