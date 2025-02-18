import React, { useEffect, useState } from "react";

import ReviewQuantityData from "./ReviewQuantityData";

import { fetchReviewCountByProductId } from "../../utility/reviewUtility/fetchReviewCountByProductId";

const ReviewQuantityDataProductDetail = ({ productId }) => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetchReviewCountByProductId(productId, setCount);
  }, []);

  return (
    <div
      className="container d-flex flex-column justify-content-center "
      style={{ width: "30%", gap: "0.2em", minWidth: "350px" }}
    >
      <ReviewQuantityData productId={productId} rating={5} count={count} />
      <ReviewQuantityData productId={productId} rating={4} count={count} />
      <ReviewQuantityData productId={productId} rating={3} count={count} />
      <ReviewQuantityData productId={productId} rating={2} count={count} />
      <ReviewQuantityData productId={productId} rating={1} count={count} />
    </div>
  );
};

export default ReviewQuantityDataProductDetail;
