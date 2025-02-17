import React from "react";

import NavBar from "./NavBar/NavBar";
import CartItemContainer from "./carts/CartItemContainer";
import PriceContainer from "./carts/PriceContainer";

const CartPage = () => {
  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <NavBar activePage="cart" />

      <div
        className="w-100 container d-flex flex-row gap-5 "
        style={{ paddingTop: "80px" }}
      >
        <CartItemContainer />
        <PriceContainer />
      </div>
    </div>
  );
};

export default CartPage;
