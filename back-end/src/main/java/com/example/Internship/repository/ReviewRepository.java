package com.example.Internship.repository;


import com.example.Internship.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByUserId(Integer id);
    List<Review> findByProductId(Integer id);
    List<Review> findByUserIdAndProductId(Integer userId, Integer productId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Double findAverageRatingByProductId(@Param("productId") Integer productId);

    Integer countByProductId(Integer productId);
    Integer countByProductIdAndRatingGreaterThanEqual(Integer productId, Integer ratingThreshold);
    Integer countByProductIdAndRating(Integer productId, Integer rating);
}
