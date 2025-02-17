import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ review }) => {
  const fullStars = Math.floor(review.rating);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  return (
    <div className="container card h-100 shadow border-0 p-3">
      <div className="d-flex justify-content-between">
        <div>
          {[...Array(fullStars)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              style={{ color: "#ffa534" }}
            />
          ))}
        </div>

        <div className="text-muted">{formatDate(review.createdAt)}</div>
      </div>
      <h5 className="card-title  fw-bold mt-2" style={{ fontSize: "1.1em" }}>
        {review.title}
      </h5>

      <p className="mt-2" style={{ textAlign: "justify" }}>
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
