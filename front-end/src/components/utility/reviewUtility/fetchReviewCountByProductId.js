export const fetchReviewCountByProductId = async (
  productId,
  setCountReview
) => {
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
  }
};
