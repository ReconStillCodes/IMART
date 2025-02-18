export const fetchPromotionProductRequest = async (
  productId,
  promotionId,
  setPromotionProductRequest
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/promotion-items/promotion-product-request/${productId}/${promotionId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Promotion Product Request");
    }

    const data = await response.json();
    setPromotionProductRequest(data);
  } catch (err) {
    console.error("Error fetching Promotion Product Request: ", err);
  }
};
