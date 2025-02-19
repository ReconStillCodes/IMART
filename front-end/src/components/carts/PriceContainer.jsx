import React, { useState, useEffect } from "react";

import { useCart } from "./CartContext/CartContext";

import PriceItem from "./PriceComponents/PriceItem";
import PriceDivider from "./PriceComponents/PriceDivider";
import PriceItemContainer from "./PriceComponents/PriceItemContainer";
import PaymentDDL from "./PriceComponents/PaymentDDL";

import { putCartCalculateTotalPrice } from "../utility/cartUtility/putCartCalculateTotalPrice";
import { putCheckout } from "../utility/orderItemUtility/putCheckout";

const PriceContainer = () => {
  const { cart, setCart, cartItems } = useCart();
  const [payment, setPayment] = useState(1);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = totalAmount * 0.1;
  const orderTotal = totalAmount + tax;

  useEffect(() => {
    putCartCalculateTotalPrice(cart.id, setCart);
  }, [cartItems]);

  const handleCheckout = () => {
    try {
      putCheckout(cart.id, payment);
    } catch (err) {
      console.log("failed to checkout ", err);
    }
  };

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

        <PaymentDDL payment={payment} setPayment={setPayment} />

        <button
          className="btn btn-primary w-100 p-2 fw-bold"
          style={{ backgroundColor: "black" }}
          onClick={() => handleCheckout()}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default PriceContainer;
