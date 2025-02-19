import React, { useState, useEffect } from "react";

import PriceItem from "./PriceItem";

import { fetchProductById } from "../../utility/productUtility/fetchProductById";

const PriceItemContainer = ({ item }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(item.productId, setProduct);
  }, [item]);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product?.id]);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <PriceItem name={product.name} price={item.totalPrice} />
      )}
    </>
  );
};

export default PriceItemContainer;
