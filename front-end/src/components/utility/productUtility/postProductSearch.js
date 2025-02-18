export const postProductSearch = async (
  name,
  minPrice,
  maxPrice,
  categoryId,
  setProducts,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await fetch("http://localhost:8080/api/products/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, minPrice, maxPrice, categoryId }),
    });

    if (!response.ok) {
      throw new Error("Error fetching search products");
    }

    const data = await response.json();
    setProducts(data);
  } catch (err) {
    console.error("Error fetching search products: ", err);
  } finally {
    setLoading(false);
  }
};
