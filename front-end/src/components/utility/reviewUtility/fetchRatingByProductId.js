export const fetchRatingByProductId = async (productId, setRating) => {
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
    console.error("Error fetching Rating: ", err);
  }
};
