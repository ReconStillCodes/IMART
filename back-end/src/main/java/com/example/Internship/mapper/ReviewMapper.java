package com.example.Internship.mapper;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.ReviewDto;
import com.example.Internship.dto.UserDto;
import com.example.Internship.entity.Product;
import com.example.Internship.entity.Review;
import com.example.Internship.entity.User;
import com.example.Internship.service.ProductService;
import com.example.Internship.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ProductMapper productMapper;

    public ReviewDto mapToReviewDto(Review review){
        return new ReviewDto(
                review.getId(),
                review.getUser().getId(),
                review.getProduct().getId(),
                review.getRating(),
                review.getTitle(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUpdatedAt()
        );
    }

    public Review mapToReview(ReviewDto reviewDto){
        UserDto userDto = userService.getUserById(reviewDto.getUserId());
        User user = userMapper.mapToUser(userDto);

        ProductDto productDto = productService.getProductById(reviewDto.getProductId());
        Product product = productMapper.mapToProduct(productDto);

        return new Review(
                reviewDto.getId(),
                user,
                product,
                reviewDto.getRating(),
                reviewDto.getTitle(),
                reviewDto.getComment(),
                reviewDto.getCreatedAt(),
                reviewDto.getUpdatedAt()
        );
    }
}
