import React from "react";

const PromotionProductCard = ({ promotionItem, promotionProduct }) => {
  const formatCurrency = (value) => {
    return `Rp ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  return (
    <>
      {promotionItem && promotionProduct ? (
        <div className="bg-danger text-white fw-bold  rounded-pill d-inline-flex  justify-content-center align-items-center px-3 py-1">
          <span>{promotionProduct.promotionBanner}</span>
        </div>
      ) : null}
    </>
  );
};

export default PromotionProductCard;
