import React, { useEffect, useState } from "react";

import { fetchOrderItemQuantity } from "../../../utility/orderItemUtility/fetchOrderItemQuantity";

const SoldProductDetail = ({ productId }) => {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderItemQuantity(productId, setQuantity);
  }, []);

  useEffect(() => {
    if (quantity >= 0) {
      setLoading(false);
    }
  }, [quantity]);

  const formatQuantity = (quantity) => {
    if (quantity >= 1000000) {
      return (quantity / 1000000).toFixed(0) + "M+";
    } else if (quantity >= 1000) {
      return (quantity / 1000).toFixed(0) + "K+";
    } else {
      return quantity;
    }
  };

  return (
    <div>{loading ? null : <span>{formatQuantity(quantity)} Sold</span>}</div>
  );
};

export default SoldProductDetail;
