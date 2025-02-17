import React from "react";

const PriceInput = ({ label, price, setPrice }) => {
  return (
    <input
      type="number"
      className="form-control"
      placeholder={label}
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      style={{
        backgroundColor: "whitesmoke",
        border: "3px solid black",
        outline: "none",
        maxWidth: "150px",
      }}
    />
  );
};

export default PriceInput;
