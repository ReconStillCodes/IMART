import React, { useEffect, useState } from "react";

import { fetchReviewCountByProductId } from "../../../utility/reviewUtility/fetchReviewCountByProductId";

const CountReviewProductDetail = ({ productId }) => {
  const [countReview, setCountReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviewCountByProductId(productId, setCountReview);
  }, []);

  useEffect(() => {
    if (countReview) {
      setLoading(false);
    }
  }, [countReview]);

  const formatCount = (quantity) => {
    if (quantity >= 1000000) {
      return (quantity / 1000000).toFixed(0) + "M+";
    } else if (quantity >= 1000) {
      return (quantity / 1000).toFixed(0) + "K+";
    } else {
      return quantity;
    }
  };

  return (
    <div>
      {loading ? null : <span>{formatCount(countReview)} Reviews</span>}
    </div>
  );
};

export default CountReviewProductDetail;
