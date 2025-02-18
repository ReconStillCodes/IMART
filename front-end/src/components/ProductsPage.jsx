import React, { useEffect, useState } from "react";

import NavBar from "./NavBar/NavBar";
import ProductCard from "./products/ProductCard";
import SearchInput from "./products/filterProducts/SearchInput";
import CategoryDDL from "./products/filterProducts/CategoryDDL";
import PriceInput from "./products/filterProducts/PriceInput";
import emptyBoxImage from "../assets/no-item-found.png";

import { fetchAllProducts } from "./utility/productUtility/fetchAllProducts";
import { postProductSearch } from "./utility/productUtility/postProductSearch";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts(setProducts, setLoading);
  }, []);

  useEffect(() => {
    let name = searchTerm;
    postProductSearch(
      name,
      minPrice,
      maxPrice,
      category,
      setProducts,
      setLoading
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
      <div className="container w-100 mt-5">
        {loading ? (
          <div></div>
        ) : products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img src={emptyBoxImage} alt="No products found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
