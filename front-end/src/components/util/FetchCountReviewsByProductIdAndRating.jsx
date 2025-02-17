import React, { useEffect, useState } from "react";

const FetchCountReviewsByProductIdAndRating = (productId, rating) => {
  const [countRating, setCountRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCountRating = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/count/${productId}/${rating}`
      );

      if (!response) {
        console.log("Failed fetch count rating");
      }

      const data = await response.json();
      setCountRating(data);
    } catch (err) {
      console.error("Failed fetch count rating ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountRating();
  }, [productId, rating]);

  return { countRating, loading };
};

export default FetchCountReviewsByProductIdAndRating;
