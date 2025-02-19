package com.example.Internship.dto;

import com.example.Internship.entity.Order;
import com.example.Internship.entity.Product;
import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

public class OrderItemDto {

    private Integer id;
    private Integer productId;
    private Integer orderId;
    private Integer quantity;
    private Double totalPrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public OrderItemDto() {
    }

    public OrderItemDto(Integer id, Integer productId, Integer orderId, Integer quantity, Double totalPrice, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.productId = productId;
        this.orderId = orderId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public OrderItemDto(Integer productId, Integer orderId, Integer quantity, Double totalPrice) {
        this.productId = productId;
        this.orderId = orderId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
