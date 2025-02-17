package com.example.Internship.service;

import com.example.Internship.dto.PromotionDto;
import com.example.Internship.dto.ReviewDto;
import com.example.Internship.entity.Promotion;
import com.example.Internship.entity.Review;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.ReviewMapper;
import com.example.Internship.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository repo;

    @Autowired
    private ReviewMapper reviewMapper;

    public ReviewDto createReview(ReviewDto reviewDto){
        Review review = reviewMapper.mapToReview(reviewDto);
        Review savedReview = repo.save(review);
        return reviewMapper.mapToReviewDto(savedReview);
    }

    public ReviewDto getReviewById(Integer id){
        Review review = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Review does not Exist with id : " + id));
        return reviewMapper.mapToReviewDto(review);
    }

    public List<ReviewDto> getAllReviews(){
        List<Review> reviewList = repo.findAll();
        return reviewList.stream().map((review) -> reviewMapper.mapToReviewDto(review)).collect(Collectors.toList());
    }

    public List<ReviewDto> getReviewsByUserId(Integer id){
        List<Review> reviewList = repo.findByUserId(id);
        return reviewList.stream().map((review) -> reviewMapper.mapToReviewDto(review)).collect(Collectors.toList());
    }

    public List<ReviewDto> getReviewsByProductId(Integer id){
        List<Review> reviewList = repo.findByProductId(id);
        return reviewList.stream().map((review) -> reviewMapper.mapToReviewDto(review)).collect(Collectors.toList());
    }

    public List<ReviewDto> getReviewsByUserIdAndProductId(Integer userId, Integer productId){
        List<Review> reviewList = repo.findByUserIdAndProductId(userId, productId);
        return reviewList.stream().map((review) -> reviewMapper.mapToReviewDto(review)).collect(Collectors.toList());
    }

    public Double getAverageProductRating(Integer productId){
        Double averageRating = repo.findAverageRatingByProductId(productId);
        return averageRating != null ?  Math.round(averageRating * 10.0) / 10.0 : 5.0;
    }

    public Integer countByProductId(Integer productId){
        Integer count = repo.countByProductId(productId);
        return count != null ? count : 0;
    }

    public Integer getSatisfyPercentage(Integer productId){
        Integer total = countByProductId(productId);

        if(total == 0 ){
            return 100;
        }

        Integer satisfyCount = repo.countByProductIdAndRatingGreaterThanEqual(productId, 3);
        return (int) Math.round((satisfyCount * 100.0) / total);
    }

    public Integer countByProductIdAndRating(Integer productId, Integer rating){
        Integer count = repo.countByProductIdAndRating(productId, rating);
        return count != null ? count : 0;
    }

}
