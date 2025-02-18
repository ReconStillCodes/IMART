import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

import RatingStar from "../../miscellaneous/RatingStar";

import FetchingRatingValueProduct from "../../../util/FetchRatingValueProduct";

const RatingProductDetail = ({ productId }) => {
  const { rating, loading, error } = FetchingRatingValueProduct(productId);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div className="d-flex gap-2 align-items-center">
      <RatingStar rating={rating} />
      <div className="">{rating}</div>
    </div>
  );
};

export default RatingProductDetail;
