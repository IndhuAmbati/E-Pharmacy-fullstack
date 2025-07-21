package com.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dao.OrderDao;
import com.dao.PaymentDao;
import com.model.Order;
import com.model.Payment;
import com.model.PaymentStatus;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:8080")
public class PaymentController {

    @Autowired
    private PaymentDao paymentDao;

    @Autowired
    private OrderDao orderDao;

    @PostMapping("/user/payments/initiate")
    public ResponseEntity<Map<String, String>> initiatePayment(@RequestBody Payment paymentRequest) {
        Map<String, String> response = new HashMap<>();

        if (paymentRequest.getOrder() == null || paymentRequest.getOrder().getOrderId() == null) {
            response.put("status", "error");
            response.put("message", "Order ID is required.");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<Order> orderOptional = orderDao.findById(paymentRequest.getOrder().getOrderId());
        if (orderOptional.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Order not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        Order order = orderOptional.get();
        double amount = order.getTotalAmount();

        paymentRequest.setAmount(amount);
        paymentRequest.setOrder(order);
        paymentRequest.setPaymentStatus(PaymentStatus.PENDING);  // Ensure this exists in your Payment model
        paymentDao.save(paymentRequest);

        String upiLink = generateUpiUrl(amount);

        response.put("status", "success");
        response.put("amount", String.valueOf(amount));
        response.put("redirectUrl", upiLink);

        return ResponseEntity.ok(response);
    }

    private String generateUpiUrl(double amount) {
        // Replace this UPI ID with your actual UPI ID (e.g., from PhonePe, GPay, Paytm)
        return "upi://pay?pa=indhu@upi&pn=IndhuPharmacy&am=" + amount + "&cu=INR";
    }
}
