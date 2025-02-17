package com.example.Internship.repository;

import com.example.Internship.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    Optional<Cart> findByUserIdAndStatusIgnoreCase(Integer userId, String status);
}
