package com.example.Internship.controller;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.ReviewDto;
import com.example.Internship.entity.Review;
import com.example.Internship.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto){
        ReviewDto savedReviewDto = reviewService.createReview(reviewDto);
        return new ResponseEntity<>(savedReviewDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable("id") Integer id){
        ReviewDto reviewDto = reviewService.getReviewById(id);
        return ResponseEntity.ok(reviewDto);
    }

    @GetMapping
    public ResponseEntity<List<ReviewDto>> getAllReviews(){
        List<ReviewDto> reviewDtoList = reviewService.getAllReviews();
        return ResponseEntity.ok(reviewDtoList);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ReviewDto>> getReviewByUserId(@PathVariable("id") Integer id){
        List<ReviewDto> reviewDtoList = reviewService.getReviewsByUserId(id);
        return ResponseEntity.ok(reviewDtoList);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<ReviewDto>> getReviewByProductId(@PathVariable("id") Integer id){
        List<ReviewDto> reviewDtoList = reviewService.getReviewsByProductId(id);
        return ResponseEntity.ok(reviewDtoList);
    }

    @GetMapping("/{userId}/{productId}")
    public ResponseEntity<List<ReviewDto>> getReviewByUserIdAndProductId(@PathVariable("userId") Integer userId, @PathVariable("productId") Integer productId){
        List<ReviewDto> reviewDtoList = reviewService.getReviewsByUserIdAndProductId(userId, productId);
        return ResponseEntity.ok(reviewDtoList);
    }

    @GetMapping("/rating/{productId}")
    public ResponseEntity<Double> getAverageRatingByProductId(@PathVariable("productId") Integer productId){
        Double averageRating = reviewService.getAverageProductRating(productId);
        return ResponseEntity.ok(averageRating);
    }

    @GetMapping("/count/{productId}")
    public ResponseEntity<Integer> countByProductId(@PathVariable("productId") Integer productId){
        Integer count = reviewService.countByProductId(productId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/satisfy/{productId}")
    public ResponseEntity<Integer> getSatisfyPercentage(@PathVariable("productId") Integer productId){
        Integer percentage = reviewService.getSatisfyPercentage(productId);
        return ResponseEntity.ok(percentage);
    }

    @GetMapping("/count/{productId}/{rating}")
    public ResponseEntity<Integer> countByProductIdAndRating(@PathVariable("productId") Integer productId,@PathVariable("rating") Integer rating){
        Integer count = reviewService.countByProductIdAndRating(productId, rating);
        return ResponseEntity.ok(count);
    }

}
