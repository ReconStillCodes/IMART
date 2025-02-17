import React from "react";
import RatingProductDetail from "./RatingProductDetail";
import SoldProductDetail from "./SoldProductDetail";
import CountReviewProductDetail from "./CountReviewProductDetail";
import BulletDecoration from "./BulletDecoration";

const MinorDataProductDetail = ({ productId }) => {
  return (
    <div className="d-flex align-items-center gap-3">
      <SoldProductDetail productId={productId} />
      <BulletDecoration />
      <RatingProductDetail productId={productId} />
      <BulletDecoration />
      <CountReviewProductDetail productId={productId} />
    </div>
  );
};

export default MinorDataProductDetail;
