import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import RedirectProductLink from "./productDetails/miscellaneous/RedirectProductLink";
import MainProductDetail from "./productDetails/DetailSection/MainProductDetail";
import ImageProductDetail from "./productDetails/miscellaneous/ImageProductDetail";
import ReviewProductDetail from "./productDetails/ReviewSection/ReviewProductDetail";

import { fetchProductById } from "./utility/productUtility/fetchProductById";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(productId, setProduct);
  }, []);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <NavBar activePage="" />

      <div className="container" style={{ paddingTop: "80px" }}>
        {loading ? null : (
          <>
            <RedirectProductLink productName={product.name} />

            {/* Main Section */}
            <div className="mt-3 w-100 d-flex justify-content-between gap-2 flex-wrap">
              <ImageProductDetail
                productImage={product.imageUrl}
                productName={product.name}
              />

              {/* Detail Section */}
              <MainProductDetail product={product} />
            </div>

            {/* Review Section */}
            <ReviewProductDetail productId={productId} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
