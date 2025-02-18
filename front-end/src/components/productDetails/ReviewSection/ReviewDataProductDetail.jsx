import React, { useEffect, useState } from "react";

import RatingCircularBar from "./RatingCircularBar";
import ReviewSummaryDataProductDetail from "./ReviewSummaryDataProductDetail";
import ReviewQuantityDataProductDetail from "./ReviewQuantityDataProductDetail";
import ReviewFilterDataProductDetail from "./ReviewFilterDataProductDetail";

import FetchingRatingValueProduct from "../../util/FetchRatingValueProduct";

const ReviewDataProductDetail = ({ reviews, productId }) => {
  const { rating, loading, error } = FetchingRatingValueProduct(productId);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <div className="container card h-100 shadow border-0 p-3 d-flex flex-row justify-between flex-wrap">
      <ReviewSummaryDataProductDetail rating={rating} productId={productId} />
      <ReviewQuantityDataProductDetail productId={productId} />
      <ReviewFilterDataProductDetail />
    </div>
  );
};

export default ReviewDataProductDetail;
