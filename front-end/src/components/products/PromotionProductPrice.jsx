import React from "react";

const PromotionProductPrice = ({ normalPrice, discountPrice }) => {
  const formatCurrency = (value) => {
    return `Rp ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  return (
    <div className="d-flex flex-column  ">
      <span className="fw-bold text-danger " style={{ fontSize: "1.2em" }}>
        {formatCurrency(discountPrice)}
      </span>
      <span
        className="fw-bold  text-muted text-decoration-line-through"
        style={{ fontSize: "0.9em" }}
      >
        {formatCurrency(normalPrice)}
      </span>
    </div>
  );
};

export default PromotionProductPrice;
