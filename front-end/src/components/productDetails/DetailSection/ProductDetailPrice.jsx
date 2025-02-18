import React, { useEffect, useState } from "react";

import FetchPromotionItem from "../../util/FetchPromotionItem";
import FetchPromotionProductRequest from "../../util/FetchPromotionProductRequest";

import NormalProductDetailPrice from "./NormalProductDetailPrice";
import PromotionProductDetailPrice from "./PromotionProductDetailPrice";

const ProductDetailPrice = ({ product }) => {
  const { promotionItem, loading, error } = FetchPromotionItem(product.id);
  const promotionProductRequest = FetchPromotionProductRequest(promotionItem);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <>
      {" "}
      {promotionItem && promotionProductRequest ? (
        <>
          {promotionProductRequest.promotionProductPrice && (
            <PromotionProductDetailPrice
              normalPrice={promotionProductRequest.normalPrice}
              discountPrice={promotionProductRequest.discountPrice}
              promotionBanner={promotionProductRequest.promotionBanner}
            />
          )}
          {!promotionProductRequest.promotionProductPrice && (
            <NormalProductDetailPrice price={product.price} />
          )}
        </>
      ) : (
        <NormalProductDetailPrice price={product.price} />
      )}{" "}
    </>
  );
};

export default ProductDetailPrice;
