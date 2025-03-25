package com.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Payment;

@Service
public class PaymentDao {
    private final PaymentRepository paymentRepo;

    @Autowired
    public PaymentDao(PaymentRepository paymentRepo) {
        this.paymentRepo = paymentRepo;
    }

    public Payment getPaymentById(Integer id) {
        return paymentRepo.findById(id).orElse(null);
    }

    public Payment getPaymentByOrderId(Integer orderId) {
        return paymentRepo.findByOrderId(orderId).orElse(null);
    }
}