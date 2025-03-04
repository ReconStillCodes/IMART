import React, { useEffect, useState } from "react";

import { fetchProductCategoryById } from "../utility/categoryUtility/fetchProductCategoryById";

const InventoryProdductRow = ({ product, idx }) => {
  const [category, setCategory] = useState("Category");
  useEffect(() => {
    fetchProductCategoryById(product.categoryId, setCategory);
  }, []);
  return (
    <div
      className="w-100 d-flex py-2 rounded shadow-sm justify-content-between gap-2 container my-1 align-items-center"
      style={{
        backgroundColor:
          idx % 2 === 0 ? "rgba(213, 224, 241, 0.5) " : "#D5E0F1",
        color: "#384B70",
      }}
    >
      <div className="" style={{ width: "4em" }}>
        <img
          className="rounded"
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "4em", height: "4em" }}
        />
      </div>
      <div
        className="d-flex flex-wrap"
        style={{ minWidth: "20em", maxWidth: "20em" }}
      >
        {product.name}
      </div>
      <div className="" style={{ width: "10em" }}>
        {category.name}
      </div>
      <div className="" style={{ width: "10em" }}>
        Price
      </div>
      <div className="" style={{ width: "10em" }}>
        stock
      </div>

      <div className="" style={{ width: "15em" }}>
        Action
      </div>
    </div>
  );
};

export default InventoryProdductRow;
