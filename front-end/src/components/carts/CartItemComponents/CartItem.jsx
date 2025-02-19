import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import { fetchProductById } from "../../utility/productUtility/fetchProductById";

const CartItem = ({ item, handleUpdateQuantity, handleDeleteCartItem }) => {
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

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="mb-3">
      {loading || !product ? (
        <div></div>
      ) : (
        <div className="d-flex flex-row justify-content-between gap-4">
          <img
            src={product.imageUrl}
            alt="test"
            className="img-fluid rounded "
            style={{
              minWidth: "250px",
              minHeight: "250px",
              maxWidth: "250px",
              maxHeight: "250px",
              objectFit: "cover",
            }}
          />
          <div className="w-100 d-flex flex-column justify-content-between">
            <div>
              <h5>{product.name}</h5>
              <p style={{ textAlign: "justify" }}>{product.description}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center ">
              <h4>{formatPrice(item.totalPrice)}</h4>
              <div className="d-flex gap-2 align-items-center">
                <button
                  className="text-dark d-flex justify-content-center align-items-center p-0 me-4"
                  style={{
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "none",
                  }}
                  onClick={() => handleDeleteCartItem(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>

                <button
                  className="p-0 text-dark d-flex rounded-pill justify-content-center align-items-center fw-bold"
                  style={{
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "2px solid black",
                    height: "35px",
                    width: "35px",
                  }}
                  onClick={() => handleUpdateQuantity(item.id, -1)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <div className="text-center" style={{ minWidth: "2em" }}>
                  {item.quantity}
                </div>

                <button
                  className="p-0 text-dark d-flex rounded-pill justify-content-center align-items-center fw-bold"
                  style={{
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "2px solid black",
                    height: "35px",
                    width: "35px",
                  }}
                  onClick={() => handleUpdateQuantity(item.id, 1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
