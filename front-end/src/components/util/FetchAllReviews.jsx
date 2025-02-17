import { useDebugValue, useEffect, useState } from "react";

const FetchAllReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/product/${productId}`
      );

      if (!response.ok) {
        throw new Error("Error fetching reviews");
      }

      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch Reviews: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return { reviews, loading, error };
};

export default FetchAllReviews;
