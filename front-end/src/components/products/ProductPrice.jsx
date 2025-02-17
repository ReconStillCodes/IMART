import React from "react";
import NormalProductPrice from "./NormalProductPrice";
import PromotionProductPrice from "./PromotionProductPrice";

const ProductPrice = ({ promotionItem, promotionProduct, price }) => {
  return (
    <>
      {promotionItem && promotionProduct ? (
        <>
          {promotionProduct.promotionProductPrice && (
            <div>
              <PromotionProductPrice
                normalPrice={promotionProduct.normalPrice}
                discountPrice={promotionProduct.discountPrice}
              />
            </div>
          )}
          {!promotionProduct.promotionProductPrice && (
            <div>
              <NormalProductPrice price={price} />
            </div>
          )}
        </>
      ) : (
        <NormalProductPrice price={price} />
      )}
    </>
  );
};

export default ProductPrice;
