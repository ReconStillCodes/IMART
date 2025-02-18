import React, { useEffect, useState } from "react";

import RatingCircularBar from "./RatingCircularBar";
import RatingStar from "../miscellaneous/RatingStar";

import CountReviewProductDetail from "../DetailSection/MinorDetailSection/CountReviewProductDetail";

import { fetchReviewSatisfyPercentage } from "../../utility/reviewUtility/fetchReviewSatisfyPercentage";

const ReviewDataProductDetail = ({ rating, productId }) => {
  const [satisfyPercentage, setSatisfyPercentage] = useState(null);

  useEffect(() => {
    fetchReviewSatisfyPercentage(productId, setSatisfyPercentage);
  }, []);

  return (
    <div
      className="container d-flex justify-content-center gap-3"
      style={{ width: "30%", minWidth: "350px" }}
    >
      <RatingCircularBar
        progress={rating ?? 0}
        size={100}
        strokeWidth={10}
        color="black"
      />

      <div className="w-100 d-flex flex-column justify-content-center">
        <span style={{ fontSize: "1.2em" }}>
          <RatingStar rating={rating} />
        </span>

        <h6 className="fw-bold mt-2">
          {satisfyPercentage}% of buyers are satisfied
        </h6>

        <div style={{ fontSize: "0.8em" }}>
          <CountReviewProductDetail productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default ReviewDataProductDetail;
