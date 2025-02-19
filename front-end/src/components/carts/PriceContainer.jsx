import React from "react";

import { useCart } from "./CartContext/CartContext";

import PriceItem from "./PriceComponents/PriceItem";
import PriceDivider from "./PriceComponents/PriceDivider";
import PriceItemContainer from "./PriceComponents/PriceItemContainer";

const PriceContainer = () => {
  const { cartItems } = useCart();
  console.log(cartItems);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = totalAmount * 0.1; // Example: 10% tax
  const orderTotal = totalAmount + tax;

  return (
    <div className="" style={{ width: "40%" }}>
      <div className="rounded shadow p-3 w-100">
        <div className="mb-2 fw-bold">Order Summary</div>

        <div className="text-secondary">
          {cartItems.map((item) => (
            <span key={item.id}>
              <PriceItemContainer item={item} />
            </span>
          ))}
        </div>
        <PriceDivider />
        <div className="text-secondary">
          <PriceItem name="Amount" price={totalAmount} />
          <PriceItem name="Tax" price={tax} />
        </div>
        <PriceDivider />
        <div className="fw-bold">
          <PriceItem name="Order Total" price={orderTotal} />
        </div>
      </div>
    </div>
  );
};

export default PriceContainer;
