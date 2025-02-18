export const fetchPromotionItemByProductId = async (
  productId,
  setPromotionItem
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/promotion-items/products/${productId}`
    );
    if (!response.ok) {
      setPromotionItem(null);
      throw new Error("Failed to fetch promotion Item");
    }

    const data = await response.json();
    setPromotionItem(data);
  } catch (err) {
    setPromotionItem(null);
  }
};
