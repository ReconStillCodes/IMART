import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const InventoryHeader = () => {
  return (
    <div
      className="container w-100 shadow-sm p-3 d-flex justify-content-between align-items-center rounded"
      style={{ minWidth: "700px" }}
    >
      <div
        className="d-flex align-items-center p-2 rounded h-100"
        style={{ minWidth: "400px", border: "2px solid rgba(0,0,0,1)" }}
      >
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "10px" }} />
        <input
          type="text"
          className="text-dark w-100"
          placeholder="Search products..."
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      <div className="d-flex align-items-center gap-3">
        <button
          className="btn bg-white d-flex gap-2 align-items-center"
          style={{ border: "2px solid black" }}
        >
          Category
        </button>

        <button className="btn btn-dark d-flex gap-2 align-items-center">
          <FontAwesomeIcon icon={faPlus} style={{}} />
          New Product
        </button>
      </div>
    </div>
  );
};

export default InventoryHeader;
