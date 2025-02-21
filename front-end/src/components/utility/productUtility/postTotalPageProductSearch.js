export const postTotalPageProductSearch = async (
  name,
  minPrice,
  maxPrice,
  categoryId,
  setTotalPage
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/search/count/20`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, minPrice, maxPrice, categoryId }),
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching Total Page Search Products");
    }

    const data = await response.json();
    setTotalPage(data);
  } catch (err) {
    console.error("Error fetching Total Page Search Products: ", err);
  }
};
