export const fetchProductById = async (productId, setProduct) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${productId}`
    );

    if (!response.ok) {
      throw new Error("Error fetching product");
    }

    const data = await response.json();
    setProduct(data);
  } catch (err) {
    console.error("Failed to fetch Product: ", err);
  }
};
