export const putCartItemUpdateQuantity = async (
  cartItemId,
  change,
  setUpdatedItem
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/cart-items/update-quantity/${cartItemId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(change),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    setUpdatedItem(data);
  } catch (err) {
    console.error("Failed to Put Cart Item Update Quantity ", err);
  }
};
