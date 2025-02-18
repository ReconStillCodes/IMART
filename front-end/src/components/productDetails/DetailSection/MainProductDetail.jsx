import React, { useEffect, useState } from "react";

import MinorDataProductDetail from "./MinorDetailSection/MinorDataProductDetail";
import ProductDetailPrice from "./ProductDetailPrice";

import { fetchUserBySession } from "../../utility/userUtility/fetchUserBySession";
import { fetchActiveCart } from "../../utility/cartUtility/fetchActiveCart";
import { postCartItem } from "../../utility/cartItemUtility/postCartItem";
import { postCart } from "../../utility/cartUtility/postCart";

const MainProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchUserBySession("IMART_SESSION", setUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchActiveCart(user.id, setCart);
    }
  }, [user]);

  const handleCart = () => {
    if (!cart) {
      postCart(user.id, 0, "active", setCart);
    }

    postCartItem(cart.id, product.id, quantity);
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ width: "38%", minWidth: "400px" }}
    >
      {/* Information Section */}
      <div>
        <h1 className="fw-bold">{product.name}</h1>
        <MinorDataProductDetail productId={product.id} />
        <p className="mt-4" style={{ fontSize: "1.1em", textAlign: "justify" }}>
          {product.description}
        </p>

        <ProductDetailPrice product={product} />
      </div>

      {/* Button Section */}
      <div>
        <button
          className="btn btn-primary w-100 p-2 fw-bold"
          style={{ backgroundColor: "black" }}
        >
          Buy this Item
        </button>

        <div className="d-flex gap-2 mt-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            style={{
              width: "40%",
              backgroundColor: "transparent",
              border: "3px solid black",
            }}
          />

          <button
            className="btn text-dark fw-bold"
            style={{
              width: "60%",
              backgroundColor: "transparent",
              border: "3px solid black",
            }}
            onClick={handleCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainProductDetail;
