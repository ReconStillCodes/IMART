export const fetchActiveCart = async (userId, setCart) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/carts/userId/${userId}/status/active`
    );

    if (!response) {
      throw new Error("Failed fetching cart by user Id and Status");
    }

    const data = await response.json();
    setCart(data);
  } catch (err) {
    console.error("Failed fetching cart by user Id and Status : ", err);
  }
};
