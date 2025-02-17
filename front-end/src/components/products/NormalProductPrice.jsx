import React from "react";

const NormalProductPrice = ({ price }) => {
  const formatCurrency = (value) => {
    return `Rp ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  return (
    <div className="fw-bold  text-danger" style={{ fontSize: "1.2em" }}>
      {formatCurrency(price)}
    </div>
  );
};

export default NormalProductPrice;
