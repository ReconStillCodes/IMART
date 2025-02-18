export const postCartItem = async (cartId, productId, quantity) => {
  try {
    const response = await fetch("http://localhost:8080/api/cart-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId, productId, quantity }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
  } catch (err) {
    console.error("Failed to Post Cart Item ", err);
  }
};
