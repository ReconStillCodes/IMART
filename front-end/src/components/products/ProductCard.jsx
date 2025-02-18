import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PromotionProductCard from "./PomotionProductCard";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

import { fetchPromotionItemByProductId } from "../utility/promotionItemUtility/fetchPromotionItemByProductId";
import { fetchPromotionProductRequest } from "../utility/promotionItemUtility/fetchPromotionProductRequest";

const ProductCard = ({ product }) => {
  const [promotionItem, setPromotionItem] = useState(null);
  const [promotionProductRequest, setPromotionProductRequest] = useState(null);

  useEffect(() => {
    fetchPromotionItemByProductId(product.id, setPromotionItem);
  }, []);

  useEffect(() => {
    if (promotionItem) {
      fetchPromotionProductRequest(
        promotionItem.productId,
        promotionItem.promotionId,
        setPromotionProductRequest
      );
    }
  }, [promotionItem]);

  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none">
      <div
        className="card h-100 shadow border-0"
        style={{ borderRadius: "0.7em" }}
      >
        <div className="card-body p-0">
          <div
            className="w-100 p-3"
            style={{
              height: "300px",
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "0.7em",
            }}
            alt={product.name}
          >
            <PromotionProductCard
              promotionItem={promotionItem}
              promotionProduct={promotionProductRequest}
            />
          </div>

          <div className="container mt-3 mb-3 ">
            <h5 className="card-title  " style={{ fontSize: "1em" }}>
              {product.name}
            </h5>

            <div className="w-100 d-flex justify-content-between align-items-end">
              <ProductPrice
                promotionItem={promotionItem}
                promotionProduct={promotionProductRequest}
                price={product.price}
              />

              <ProductRating productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
