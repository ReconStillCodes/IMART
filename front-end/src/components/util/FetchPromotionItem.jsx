import { useEffect, useState } from "react";

const useFetchPromotionItem = (productId) => {
  const [promotionItem, setPromotionItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotionItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/promotion-items/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch promotion Item");
        }

        const data = await response.json();
        setPromotionItem(data[0]);
      } catch (err) {
        setError(err);
        console.error("Error fetching promotion Items: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotionItem();
  }, [productId]);

  return { promotionItem, loading, error };
};

export default useFetchPromotionItem;
