export const fetchAllCategories = async (setCategoryList) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/product-categories"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category List");
    }

    const data = await response.json();
    setCategoryList(data);
  } catch (err) {
    console.error("Error fetching category List: ", err);
  }
};
