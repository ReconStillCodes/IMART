import React from "react";

import CartDivider from "./CartItemComponents/CartDivider";
import CartItem from "./CartItemComponents/CartItem";

const CartItemContainer = () => {
  return (
    <div className="d-flex flex-column " style={{ width: "55%" }}>
      <CartDivider />

      <CartItem />

      <CartDivider />
    </div>
  );
};

export default CartItemContainer;
