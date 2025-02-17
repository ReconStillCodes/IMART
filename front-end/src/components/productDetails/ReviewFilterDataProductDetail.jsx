import React, { useEffect, useState } from "react";

import ReviewFilterDescriptionDataProductDetail from "./ReviewFilterDescriptionDataProductDetail";

const ReviewFilterDataProductDetail = () => {
  return (
    <div
      className="container d-flex justify-content-center gap-3"
      style={{ width: "30%", minWidth: "350px" }}
    >
      <div className="w-50 d-flex flex-column gap-1 ">
        <ReviewFilterDescriptionDataProductDetail
          rating={5}
          description={"Exceeds expectations. Highly recommended!"}
        />

        <ReviewFilterDescriptionDataProductDetail
          rating={4}
          description={"Satisfying experience with minor issues"}
        />
      </div>

      <div className="w-50 d-flex flex-column  gap-1 ">
        <ReviewFilterDescriptionDataProductDetail
          rating={3}
          description={"Decent but has some drawbacks."}
        />
        <ReviewFilterDescriptionDataProductDetail
          rating={2}
          description={"Needs Improvement"}
        />
        <ReviewFilterDescriptionDataProductDetail
          rating={1}
          description={"Major issues with quality"}
        />
      </div>
    </div>
  );
};

export default ReviewFilterDataProductDetail;
