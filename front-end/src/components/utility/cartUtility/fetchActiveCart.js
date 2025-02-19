export const fetchActiveCart = async (userId, setCart, setIsActiveChecked) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/carts/userId/${userId}/status/active`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.warn("Cart not found:", errorData.message);
      setCart(null);
      return;
    }

    const data = await response.json();
    setCart(data);
  } catch (err) {
    console.error("Error fetching cart:", err);
    setCart(null);
  } finally {
    setIsActiveChecked(true);
  }
};
