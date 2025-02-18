import React, { useEffect, useState } from "react";

import NormalProductDetailPrice from "./NormalProductDetailPrice";
import PromotionProductDetailPrice from "./PromotionProductDetailPrice";

import { fetchPromotionItemByProductId } from "../../utility/promotionItemUtility/fetchPromotionItemByProductId";
import { fetchPromotionProductRequest } from "../../utility/promotionItemUtility/fetchPromotionProductRequest";

const ProductDetailPrice = ({ product }) => {
  // const { promotionItem, loading, error } = FetchPromotionItem(product.id);
  // const promotionProductRequest = FetchPromotionProductRequest(promotionItem);

  // if (loading) {
  //   return <div></div>;
  // }

  // if (error) {
  //   return <div></div>;
  // }

  const [promotionItem, setPromotionItem] = useState(null);
  const [promotionProductRequest, setPromotionProductRequest] = useState(null);

  useEffect(() => {
    fetchPromotionItemByProductId(product.id, setPromotionItem);
  }, []);

  useEffect(() => {
    if (promotionItem) {
      fetchPromotionProductRequest(
        product.id,
        promotionItem.promotionId,
        setPromotionProductRequest
      );
    }
  }, [promotionItem]);

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
