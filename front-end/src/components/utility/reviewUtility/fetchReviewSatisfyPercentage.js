export const fetchReviewSatisfyPercentage = async (
  productId,
  setSatisfyPercentage
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/reviews/satisfy/${productId}`
    );

    if (!response.ok) {
      throw new Error("Error fetching satisfy percentage");
    }

    const data = await response.json();
    setSatisfyPercentage(data);
  } catch (err) {
    console.error("Failed to fetch satisfy percentage: ", err);
  }
};
