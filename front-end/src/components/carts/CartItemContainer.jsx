import React from "react";

import CartDivider from "./CartItemComponents/CartDivider";
import CartItem from "./CartItemComponents/CartItem";

const CartItemContainer = ({ cartItems }) => {
  return (
    <div className="d-flex flex-column " style={{ width: "55%" }}>
      <CartDivider />

      {cartItems.map((item) => (
        <span key={item.id}>
          <CartItem item={item} />

          <CartDivider />
        </span>
      ))}
    </div>
  );
};

export default CartItemContainer;
