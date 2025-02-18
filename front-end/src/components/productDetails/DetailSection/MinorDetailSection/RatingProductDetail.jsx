import React, { useState, useEffect } from "react";
import RatingStar from "../../miscellaneous/RatingStar";

import { fetchRatingByProductId } from "../../../utility/reviewUtility/fetchRatingByProductId";

const RatingProductDetail = ({ productId }) => {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    fetchRatingByProductId(productId, setRating);
  }, []);

  return (
    <div className="d-flex gap-2 align-items-center">
      <RatingStar rating={rating} />
      <div className="">{rating}</div>
    </div>
  );
};

export default RatingProductDetail;
