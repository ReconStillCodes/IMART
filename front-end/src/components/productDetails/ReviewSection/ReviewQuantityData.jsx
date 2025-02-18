import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

import FetchCountReviewsByProductIdAndRating from "../../util/FetchCountReviewsByProductIdAndRating";

const ReviewQuantityData = ({ productId, rating, count }) => {
  const { countRating, loading } = FetchCountReviewsByProductIdAndRating(
    productId,
    rating
  );

  if (loading) {
    return <div></div>;
  }

  const percentage = (countRating / count) * 100;

  return (
    <div
      className="d-flex gap-2 align-items-center "
      style={{ fontSize: "0.8em" }}
    >
      <FontAwesomeIcon icon={faStar} style={{ color: "#ffa534" }} />
      <span className="text-muted">{rating}</span>
      <div
        className="h-50 rounded-pill"
        style={{ width: "80%", backgroundColor: "#E0E0E0" }}
      >
        <div
          className="h-100 bg-black rounded-pill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <span className="fw-bold">{countRating}</span>
    </div>
  );
};

export default ReviewQuantityData;
