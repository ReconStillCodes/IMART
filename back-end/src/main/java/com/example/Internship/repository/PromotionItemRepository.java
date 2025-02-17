package com.example.Internship.repository;

import com.example.Internship.entity.PromotionItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromotionItemRepository extends JpaRepository<PromotionItem, Integer> {
    List<PromotionItem> findByPromotionId(Integer id);
    List<PromotionItem> findByProductId(Integer id);
}
