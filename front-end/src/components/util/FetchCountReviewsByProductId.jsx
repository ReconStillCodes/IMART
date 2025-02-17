import React, { useEffect, useState } from "react";

const FetchCountReviewsByProductId = (productId) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/count/${productId}`
      );

      if (!response.ok) {
        throw new Error("Error fetching count reviews");
      }

      const data = await response.json();
      setCount(data);
    } catch (err) {
      console.error("Failed to fetch count reviews: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [productId]);

  return { count, loading };
};

export default FetchCountReviewsByProductId;
