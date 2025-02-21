export const fetchAllProducts = async (setProducts, setLoading, page) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/page/${page}/size/20`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    setProducts(data);
  } catch (err) {
    console.error("Error fetching products: ", err);
  } finally {
    setLoading(false);
  }
};
