import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const RatingStar = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div className="position-relative d-inline-block">
      {/* Background stars */}
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          style={{ color: "#ffa534", opacity: 0.3 }}
        />
      ))}

      <div className="position-absolute d-flex left-0" style={{ top: 4 }}>
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{ color: "#ffa534" }}
          />
        ))}
        {halfStar && (
          <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#ffa534" }} />
        )}
      </div>
    </div>
  );
};

export default RatingStar;
