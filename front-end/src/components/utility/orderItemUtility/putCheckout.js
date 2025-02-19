export const putCheckout = async (cartId, paymentId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/orders/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId, paymentId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    console.log("SUCCEED AT CHECKOUT");
  } catch (err) {
    console.error("Failed to checkout ", err);
  }
};
