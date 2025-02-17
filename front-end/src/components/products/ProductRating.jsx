import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import FetchingRatingValueProduct from "../util/FetchRatingValueProduct";

const ProductRating = ({ productId }) => {
  const { rating, loading, error } = FetchingRatingValueProduct(productId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="d-flex gap-1 align-items-center text-muted">
      <FontAwesomeIcon icon={faStar} style={{ color: "#ffa534" }} />
      <span className="fw-bold">{rating}</span>
    </div>
  );
};

export default ProductRating;
