import React, { useEffect, useState } from "react";

import ReviewCard from "./ReviewCard";
import ReviewDataProductDetail from "./ReviewDataProductDetail";

import { fetchAllReviews } from "../../utility/reviewUtility/fetchAllReviews";

const ReviewProductDetail = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAllReviews(productId, setReviews);
  }, []);

  return (
    <div className="w-100 mt-5">
      <h5 className="fw-bold">Customer Review</h5>

      <ReviewDataProductDetail reviews={reviews} productId={productId} />

      <div className="row mt-3">
        {reviews.length > 0
          ? reviews.map((review) => (
              <div className="col-lg-6 col-md-6 col-sm-12 mb-3" key={review.id}>
                <ReviewCard review={review} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ReviewProductDetail;
