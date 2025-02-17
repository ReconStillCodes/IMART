package com.example.Internship.service;

import com.example.Internship.dto.PaymentDto;
import com.example.Internship.dto.UserDto;
import com.example.Internship.entity.Payment;
import com.example.Internship.entity.User;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.PaymentMapper;
import com.example.Internship.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repo;

    @Autowired
    private PaymentMapper paymentMapper;

    public PaymentDto createPayment(PaymentDto paymentDto){
        Payment payment = paymentMapper.mapToPayment(paymentDto);
        Payment savedPayment = repo.save(payment);
        return paymentMapper.mapToPaymentDto(savedPayment);
    }

    public PaymentDto getPaymentById(Integer id){
        Payment payment = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Payment does not exist with the given id : " + id));
        return paymentMapper.mapToPaymentDto(payment);
    }

    public List<PaymentDto> getAllPayments(){
        List<Payment> paymentList = repo.findAll();
        return paymentList.stream().map((payment) -> paymentMapper.mapToPaymentDto(payment)).collect(Collectors.toList());
    }

}
