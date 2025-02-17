import React from "react";

const PromotionProductDetailPrice = ({
  normalPrice,
  discountPrice,
  promotionBanner,
}) => {
  const formatCurrency = (value) => {
    return `Rp ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  return (
    <div className="d-flex flex-column  mt-2">
      <h2 className="fw-bold  ">{formatCurrency(discountPrice)}</h2>
      <div className="w-100 d-flex gap-3">
        <h4
          className="fw-bold  text-decoration-line-through text-danger"
          style={{ opacity: 0.5 }}
        >
          {formatCurrency(normalPrice)}
        </h4>
        <h4 className="fw-bold  text-success" style={{ opacity: 0.7 }}>
          {promotionBanner}
        </h4>
      </div>
    </div>
  );
};

export default PromotionProductDetailPrice;
