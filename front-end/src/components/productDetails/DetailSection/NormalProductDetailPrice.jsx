import React from "react";

const NormalProductDetailPrice = ({ price }) => {
  const formatCurrency = (value) => {
    return `Rp ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  return <h2 className="fw-bold  mt-2">{formatCurrency(price)}</h2>;
};

export default NormalProductDetailPrice;
