export const postCart = async (userId, totalPrice, status, setCart) => {
  try {
    const response = await fetch("http://localhost:8080/api/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, totalPrice, status }),
    });

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
