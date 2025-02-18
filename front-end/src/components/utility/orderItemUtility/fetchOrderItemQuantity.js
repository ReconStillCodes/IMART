export const fetchOrderItemQuantity = async (productId, setQuantity) => {
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
  }
};
