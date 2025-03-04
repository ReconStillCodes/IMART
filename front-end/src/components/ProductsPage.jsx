import React, { useEffect, useState } from "react";

import NavBar from "./NavBar/NavBar";
import ProductCard from "./products/ProductCard";
import SearchInput from "./products/filterProducts/SearchInput";
import CategoryDDL from "./products/filterProducts/CategoryDDL";
import PriceInput from "./products/filterProducts/PriceInput";
import emptyBoxImage from "../assets/no-item-found.png";

import { fetchAllProducts } from "./utility/productUtility/fetchAllProducts";
import { postProductSearch } from "./utility/productUtility/postProductSearch";
import { fetchTotalPage } from "./utility/productUtility/fetchTotalPage";
import { postTotalPageProductSearch } from "./utility/productUtility/postTotalPageProductSearch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch total pages on component mount

  useEffect(() => {
    fetchAllProducts(setProducts, setLoading, page);
    fetchTotalPage(20, setTotalPage);
  }, []);

  useEffect(() => {
    if (category > 0 || minPrice > 0 || maxPrice > 0 || searchTerm != "") {
      // setPage(0);
      postProductSearch(
        searchTerm,
        minPrice,
        maxPrice,
        category,
        setProducts,
        setLoading,
        page
      );
      postTotalPageProductSearch(
        searchTerm,
        minPrice,
        maxPrice,
        category,
        setTotalPage
      );
      setIsSearching(true);
    } else {
      // setPage(0);
      fetchAllProducts(setProducts, setLoading, page);
      fetchTotalPage(20, setTotalPage);
      setIsSearching(false);
    }
  }, [searchTerm, category, minPrice, maxPrice, page]);

  useEffect(() => {
    if (page > totalPage) {
      setPage(totalPage + 1);
    }
  }, [totalPage]);

  const toPrev = () => {
    setPage(page - 1);
  };

  const toNext = () => {
    setPage(page + 1);
  };

  const toFirst = () => {
    setPage(0);
  };

  const toLast = () => {
    setPage(totalPage);
  };

  useEffect(() => {
    let name = searchTerm;
    postProductSearch(
      name,
      minPrice,
      maxPrice,
      category,
      setProducts,
      setLoading,
      0,
      20
    );
  }, [searchTerm, category, minPrice, maxPrice]);

  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <NavBar activePage="products" />

      {/* Jumbotron */}
      <div className="container" style={{ paddingTop: "80px" }}>
        <div
          className="container w-100 d-flex justify-content-center align-items-center flex-column rounded mb-4"
          style={{
            height: "40vh",
            backgroundColor: "whitesmoke",
          }}
        >
          <h1 className="text-center fw-bold" style={{ fontSize: "3rem" }}>
            Find Products on <span style={{ color: "#384B70" }}>IMart</span>{" "}
          </h1>

          <form className="d-flex gap-2 mt-5 flex-wrap justify-content-center ">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <CategoryDDL category={category} setCategory={setCategory} />

            <PriceInput
              label="Min Price"
              minPrice={minPrice}
              setPrice={setMinPrice}
            />

            <PriceInput
              label="Max Price"
              minPrice={maxPrice}
              setPrice={setMaxPrice}
            />
          </form>

          <div className=""></div>
        </div>
      </div>

      {/* Body */}
      <div className="container w-100 mt-5 pb-5">
        <div className="row">
          {products.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="w-100 d-flex justify-content-end align-items-center gap-2">
          <button
            className="btn"
            disabled={page === 0}
            style={{ border: "none" }}
            onClick={() => toFirst()}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>

          <button
            className="btn"
            disabled={page === 0}
            style={{ border: "none" }}
            onClick={() => toPrev()}
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
            onClick={() => toNext()}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>

          <button
            className="btn"
            disabled={page >= totalPage}
            style={{ border: "none" }}
            onClick={() => toLast()}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
