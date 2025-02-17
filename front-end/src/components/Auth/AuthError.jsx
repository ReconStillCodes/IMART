import React from "react";

const AuthError = ({ error }) => {
  return (
    <div className="w-100 bg-danger opacity-50 text-white p-2 text-center rounded">
      {error}
    </div>
  );
};

export default AuthError;
