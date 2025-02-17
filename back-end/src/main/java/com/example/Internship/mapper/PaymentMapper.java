package com.example.Internship.mapper;

import com.example.Internship.dto.PaymentDto;
import com.example.Internship.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentDto mapToPaymentDto(Payment payment){
        return new PaymentDto(
                payment.getId(),
                payment.getName(),
                payment.getCreatedAt(),
                payment.getCreatedAt()
        );
    }

    public Payment mapToPayment(PaymentDto paymentDto){
        return new Payment(
                paymentDto.getId(),
                paymentDto.getName(),
                paymentDto.getCreatedAt(),
                paymentDto.getCreatedAt()
        );
    }

}
