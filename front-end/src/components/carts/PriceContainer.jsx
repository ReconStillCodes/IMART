import React from "react";

import PriceItem from "./PriceComponents/PriceItem";
import PriceDivider from "./PriceComponents/PriceDivider";

const PriceContainer = () => {
  return (
    <div className="  rounded shadow p-3" style={{ width: "40%" }}>
      {" "}
      <div className="mb-2 fw-bold">Order Summary</div>
      <div className="text-secondary">
        <PriceItem name="John Doe" price={12000} />
      </div>
      <PriceDivider />
      <div className="text-secondary">
        <PriceItem name="Amount" price={12000} />
        <PriceItem name="Tax" price={12000} />
      </div>
      <PriceDivider />
      <div className="fw-bold">
        <PriceItem name="Order Total" price={12000} />
      </div>
    </div>
  );
};

export default PriceContainer;
