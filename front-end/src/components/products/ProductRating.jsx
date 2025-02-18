import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { fetchRatingByProductId } from "../utility/reviewUtility/fetchRatingByProductId";

const ProductRating = ({ productId }) => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    fetchRatingByProductId(productId, setRating);
  }, []);

  return (
    <div className="d-flex gap-1 align-items-center text-muted">
      <FontAwesomeIcon icon={faStar} style={{ color: "#ffa534" }} />
      <span className="fw-bold">{rating}</span>
    </div>
  );
};

export default ProductRating;
