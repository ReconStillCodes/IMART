import React, { useEffect, useState } from "react";

import { fetchAllCategories } from "../../utility/categoryUtility/fetchAllCategories";

const CategoryDDL = ({ category, setCategory }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetchAllCategories(setCategoryList);
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
        <option disabled></option>
      )}
    </select>
  );
};

export default CategoryDDL;
