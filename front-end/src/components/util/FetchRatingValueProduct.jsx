import { useEffect, useState } from "react";

const FetchingRatingValueProduct = (productId) => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/reviews/rating/${productId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Rating");
        }

        const data = await response.json();
        setRating(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching Rating: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [productId]);

  return { rating, loading, error };
};

export default FetchingRatingValueProduct;
