import react from "react";

const formatPrice = (price) => {
  return `Rp ${price.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const PriceItem = ({ name, price }) => {
  return (
    <div className="d-flex w-100 flex-row justify-content-between">
      <div>{name}</div>
      <div>{formatPrice(price)}</div>
    </div>
  );
};

export default PriceItem;
