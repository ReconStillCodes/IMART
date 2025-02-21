package com.example.Internship.repository;

import com.example.Internship.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE " +
            "UPPER(p.name) LIKE UPPER(CONCAT('%', :name, '%')) " +
            "AND p.price BETWEEN :minPrice AND :maxPrice ")
    Page<Product> searchProductsWithoutCategory(
            @Param("name") String name,
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice,
            Pageable pageable
    );

    @Query("SELECT p FROM Product p WHERE " +
            "UPPER(p.name) LIKE UPPER(CONCAT('%', :name, '%')) " +
            "AND p.price BETWEEN :minPrice AND :maxPrice " +
            "AND p.category.id = :categoryId")
    Page<Product> searchProductsWithCategory(
            @Param("name") String name,
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice,
            @Param("categoryId") Integer categoryId,
            Pageable pageable
    );

    @Query("SELECT COUNT(p) FROM Product p WHERE " +
            "UPPER(p.name) LIKE UPPER(CONCAT('%', :name, '%')) " +
            "AND p.price BETWEEN :minPrice AND :maxPrice")
    int countProductsWithoutCategory(
            @Param("name") String name,
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice
    );

    @Query("SELECT COUNT(p) FROM Product p WHERE " +
            "UPPER(p.name) LIKE UPPER(CONCAT('%', :name, '%')) " +
            "AND p.price BETWEEN :minPrice AND :maxPrice " +
            "AND p.category.id = :categoryId")
    int countProductsWithCategory(
            @Param("name") String name,
            @Param("minPrice") double minPrice,
            @Param("maxPrice") double maxPrice,
            @Param("categoryId") Integer categoryId
    );


    @Override
    Page<Product> findAll(Pageable pageable);
}
