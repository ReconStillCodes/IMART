import React, { useEffect, useState } from "react";

import RatingCircularBar from "./RatingCircularBar";
import ReviewSummaryDataProductDetail from "./ReviewSummaryDataProductDetail";
import ReviewQuantityDataProductDetail from "./ReviewQuantityDataProductDetail";
import ReviewFilterDataProductDetail from "./ReviewFilterDataProductDetail";

import { fetchRatingByProductId } from "../../utility/reviewUtility/fetchRatingByProductId";

const ReviewDataProductDetail = ({ reviews, productId }) => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    fetchRatingByProductId(productId, setRating);
  }, []);

  return (
    <div className="container card h-100 shadow border-0 p-3 d-flex flex-row justify-between flex-wrap">
      <ReviewSummaryDataProductDetail rating={rating} productId={productId} />
      <ReviewQuantityDataProductDetail productId={productId} />
      <ReviewFilterDataProductDetail />
    </div>
  );
};

export default ReviewDataProductDetail;
