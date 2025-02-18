export const fetchReviewCountByProductIdAndRating = async (
  productId,
  rating,
  setCountRating
) => {
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
  }
};
