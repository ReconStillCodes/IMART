import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ item }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${item.productId}`
      );

      if (!response) {
        throw new Error("Failed fetching product by id");
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error("Failed fetching product by id : ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [item]);

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
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
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
                  className="text-dark d-flex justify-content-center align-items-center p-0"
                  style={{
                    backgroundColor: "transparent",
                    outline: "none",
                    border: "none",
                  }}
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
