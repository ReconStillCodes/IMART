import React, { useEffect, useState } from "react";

const CountReviewProductDetail = ({ productId }) => {
  const [countReview, setCountReview] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCountReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/count/${productId}`
      );

      if (!response.ok) {
        throw new Error("Error fetching Count Review");
      }

      const data = await response.json();
      setCountReview(data);
    } catch (err) {
      console.error("Failed to fetch Count Review : ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountReview();
  }, [productId]);

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
