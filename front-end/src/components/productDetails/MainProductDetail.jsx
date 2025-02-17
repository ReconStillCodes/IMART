import React, { useEffect, useState } from "react";

import MinorDataProductDetail from "./MinorDataProductDetail";
import ProductDetailPrice from "./ProductDetailPrice";

import FetchUserData from "../util/utilUsers/FetchUserData";
// import PostCartItem from "../util/utilCarts/PostCartItem";

const MainProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const user = FetchUserData("IMART_SESSION");
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/userId/${user.id}/status/active`
      );

      if (!response) {
        throw new Error("Failed fetching cart by user Id and Status");
      }

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error("Failed fetching cart by user Id and Status : ", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const PostCartItem = async () => {
    const cartId = cart.id;
    const productId = product.id;
    const totalPrice = product.price * quantity;

    try {
      const response = await fetch("http://localhost:8080/api/cart-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, productId, quantity, totalPrice }),
      });

      if (!response.ok) {
        throw new Error("Failed to Post Cart Item");
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("Failed to Post Cart Item ", err);
    }
  };

  const handleCart = () => {
    if (!cart) {
      console.log("Cart Doesn't exist");
      return;
    }

    PostCartItem();
    // console.log(cart);
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
