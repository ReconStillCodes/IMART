import React, { useEffect, useState } from "react";

const FetchCartByUserIdAndStatus = (userId, status) => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/userId/${userId}/status/${status}`
      );

      if (!response) {
        throw new Error("Failed fetching cart by user Id and Status");
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error("Failed fetching cart by user Id and Status : ", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId, status]);

  return cart;
};

export default FetchCartByUserIdAndStatus;
