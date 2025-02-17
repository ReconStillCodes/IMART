import React, { useState, useEffect } from "react";

const PostCartItem = async (cartIds, products, quantitys) => {
  const cartId = cartIds;
  const productId = products.id;
  const quantity = Number(quantitys);
  const totalPrice = products.price * this.quantity;

  try {
    const response = await fetch("http://localhost:8080/api/cart-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId, productId, quantity, totalPrice }),
    });

    if (!response.ok) {
      throw new Error("Failed to Post Cart Item");
    }

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Failed to Post Cart Item ", err);
  }
};

export default PostCartItem;
