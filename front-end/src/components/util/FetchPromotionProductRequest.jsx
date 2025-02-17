import { useEffect, useState } from "react";

const useFetchPromotionProductRequest = (promotionItem) => {
  const [promotionProductRequest, setPromotionProductRequest] = useState(null);

  useEffect(() => {
    if (promotionItem) {
      const fetchPromotionProductRequest = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/promotion-items/promotion-product-request/${promotionItem.productId}/${promotionItem.promotionId}`
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
      fetchPromotionProductRequest();
    }
  }, [promotionItem]);

  return promotionProductRequest;
};

export default useFetchPromotionProductRequest;
