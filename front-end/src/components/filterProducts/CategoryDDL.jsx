import React, { useEffect, useState } from "react";

const CategoryDDL = ({ category, setCategory }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategoryList = async () => {
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
    fetchCategoryList();
  }, []);

  return (
    <select
      className="form-select"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      style={{
        backgroundColor: "whitesmoke",
        border: "3px solid black",
        outline: "none",
        maxWidth: "150px",
      }}
    >
      <option value="0">All Categories</option>

      {categoryList.length > 0 ? (
        categoryList.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))
      ) : (
        <option disabled>Loading categories...</option>
      )}
    </select>
  );
};

export default CategoryDDL;
