export const putCartCalculateTotalPrice = async (cartId, setCart) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/carts/calculate-total-price/${cartId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    setCart(data);
  } catch (err) {
    console.error("Failed to Post Cart Item ", err);
  }
};
