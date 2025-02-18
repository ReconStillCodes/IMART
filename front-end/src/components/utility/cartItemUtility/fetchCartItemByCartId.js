export const fetchCartItemByCartId = async (cartId, setCartItems) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/cart-items/cartId/${cartId}`
    );

    if (!response) {
      throw new Error("Failed fetching all cart items: ");
    }

    const data = await response.json();
    setCartItems(data);
  } catch (err) {
    console.error("Failed fetching all cart items: ", err);
  }
};
