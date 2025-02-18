import React, { useEffect, useState } from "react";

const SoldProductDetail = ({ productId }) => {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchQuantity = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/order-items/product-quantity/${productId}`
      );

      if (!response.ok) {
        throw new Error("Error fetching Product Quantity");
      }

      const data = await response.json();
      setQuantity(data);
    } catch (err) {
      console.error("Failed to fetch Product Quantity : ", err);
    } finally {
      setLoading(false);
    }
  };

  const formatQuantity = (quantity) => {
    if (quantity >= 1000000) {
      return (quantity / 1000000).toFixed(0) + "M+";
    } else if (quantity >= 1000) {
      return (quantity / 1000).toFixed(0) + "K+";
    } else {
      return quantity;
    }
  };

  useEffect(() => {
    fetchQuantity();
  }, [productId]);

  return (
    <div>{loading ? null : <span>{formatQuantity(quantity)} Sold</span>}</div>
  );
};

export default SoldProductDetail;
