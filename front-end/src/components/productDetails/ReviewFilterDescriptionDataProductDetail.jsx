import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewFilterDescriptionDataProductDetail = ({ rating, description }) => {
  return (
    <div className="d-flex flex-column " style={{ fontSize: "0.7em" }}>
      <span>
        {[...Array(rating)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{ color: "#ffa534" }}
          />
        ))}
      </span>

      <span>{description}</span>
    </div>
  );
};

export default ReviewFilterDescriptionDataProductDetail;
