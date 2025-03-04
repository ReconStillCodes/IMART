export const fetchProductCategoryById = async (categoryId, setCategory) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/product-categories/${categoryId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category By Id");
    }

    const data = await response.json();
    setCategory(data);
  } catch (err) {
    console.error("Error fetching category By Id: ", err);
  }
};
