package com.example.Internship.dto;

public class CheckoutRequest {

    private Integer cartId;
    private Integer paymentId;

    public CheckoutRequest() {
    }

    public CheckoutRequest(Integer cartId, Integer paymentId) {
        this.cartId = cartId;
        this.paymentId = paymentId;
    }

    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Integer getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Integer paymentId) {
        this.paymentId = paymentId;
    }


}
