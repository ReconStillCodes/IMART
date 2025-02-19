package com.example.Internship.dto;

import com.example.Internship.entity.Payment;
import com.example.Internship.entity.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

public class OrderDto {

    private Integer id;
    private Integer userId;
    private Double totalPrice;
    private String status;
    private Integer paymentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public OrderDto() {
    }

    public OrderDto(Integer id, Integer userId, Double totalPrice, String status, Integer paymentId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.totalPrice = totalPrice;
        this.status = status;
        this.paymentId = paymentId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public OrderDto(Integer userId, Double totalPrice, String status, Integer paymentId) {
        this.userId = userId;
        this.totalPrice = totalPrice;
        this.status = status;
        this.paymentId = paymentId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Integer paymentId) {
        this.paymentId = paymentId;
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
