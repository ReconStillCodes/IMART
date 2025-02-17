package com.example.Internship.controller;

import com.example.Internship.dto.PaymentDto;
import com.example.Internship.dto.ProductCategoryDto;
import com.example.Internship.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentDto> createPayment(@RequestBody PaymentDto paymentDto){
        PaymentDto savedPaymentDto = paymentService.createPayment(paymentDto);
        return new ResponseEntity<>(savedPaymentDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<PaymentDto> getPaymentById(@PathVariable("id") Integer id){
        PaymentDto paymentDto = paymentService.getPaymentById(id);
        return ResponseEntity.ok(paymentDto);
    }

    @GetMapping
    public ResponseEntity<List<PaymentDto>> getAllPayments(){
        List<PaymentDto> paymentDtoList = paymentService.getAllPayments();
        return ResponseEntity.ok(paymentDtoList);
    }

}
