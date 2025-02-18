export const fetchAllReviews = async (productId, setReviews) => {
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
  }
};
