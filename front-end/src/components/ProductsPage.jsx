import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar";
import ProductCard from "./products/ProductCard";
import SearchInput from "./filterProducts/SearchInput";
import CategoryDDL from "./filterProducts/CategoryDDL";
import PriceInput from "./filterProducts/PriceInput";
import emptyBoxImage from "../assets/no-item-found.png";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    try {
      var name = searchTerm;
      var categoryId = category;

      const response = await fetch(
        "http://localhost:8080/api/products/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, minPrice, maxPrice, categoryId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching search products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching search products: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
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
