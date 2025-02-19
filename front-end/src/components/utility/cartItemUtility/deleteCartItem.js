export const deleteCartItem = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/cart-items/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    console.log(`Cart item with ID ${id} deleted successfully.`);
  } catch (err) {
    console.error("Failed to Delete cart Item ", err);
  }
};
