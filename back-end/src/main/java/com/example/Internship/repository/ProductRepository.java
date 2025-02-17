package com.example.Internship.repository;

import com.example.Internship.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCaseAndPriceBetween(String name, double minPrice, double maxPrice);

    List<Product> findByNameContainingIgnoreCaseAndPriceBetweenAndCategoryId(
            String name,
            double minPrice,
            double maxPrice,
            Integer categoryId
    );

}
