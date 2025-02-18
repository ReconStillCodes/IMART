import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <div
      className="d-flex align-items-center px-2 rounded"
      style={{ minWidth: "400px", border: "3px solid black" }}
    >
      <FontAwesomeIcon icon={faSearch} style={{ marginRight: "10px" }} />
      <input
        type="text"
        className="text-dark w-100"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          backgroundColor: "whitesmoke",
          border: "none",
          outline: "none",
        }}
      />
    </div>
  );
};

export default SearchInput;
