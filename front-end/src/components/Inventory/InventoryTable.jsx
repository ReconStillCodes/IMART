import React, { useEffect, useState } from "react";

import { useInventory } from "./InventoryContext/InventoryContext";

import InventoryProdductRow from "./InventoryPorductRow";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import { fetchAllProducts } from "../utility/productUtility/fetchAllProducts";
import { fetchTotalPage } from "../utility/productUtility/fetchTotalPage";

const InventoryTable = () => {
  const { products, setProducts } = useInventory();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts(setProducts, setLoading, page);
    fetchTotalPage(20, setTotalPage);
  }, []);

  return (
    <div
      className="container w-100 shadow-sm p-3 d-flex flex-column justify-content-between align-items-center rounded"
      style={{ minWidth: "700px" }}
    >
      <div className="w-100 d-flex justify-content-between gap-2 container mb-3">
        <div className="text-secondary" style={{ width: "4em" }}>
          Image
        </div>
        <div className="text-secondary" style={{ width: "20em" }}>
          Product Name
        </div>
        <div className="text-secondary" style={{ width: "10em" }}>
          Category
        </div>
        <div className="text-secondary" style={{ width: "10em" }}>
          Price
        </div>
        <div className="text-secondary" style={{ width: "10em" }}>
          stock
        </div>

        <div className="text-secondary" style={{ width: "15em" }}>
          Action
        </div>
      </div>

      {products.map((product, index) => (
        <InventoryProdductRow product={product} idx={index} key={product.id} />
      ))}

      {/* Pagination */}
      <div className="w-100 d-flex justify-content-end align-items-center gap-2">
        <button
          className="btn"
          disabled={page === 0}
          style={{ border: "none" }}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>

        <button
          className="btn"
          disabled={page === 0}
          style={{ border: "none" }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        <span>
          Page {page + 1} of {totalPage + 1}
        </span>

        <button
          className="btn"
          disabled={page >= totalPage}
          style={{ border: "none" }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>

        <button
          className="btn"
          disabled={page >= totalPage}
          style={{ border: "none" }}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  );
};

export default InventoryTable;
