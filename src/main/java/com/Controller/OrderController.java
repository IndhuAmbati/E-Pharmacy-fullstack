// OrderController.java
package com.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Service.EmailService;
import com.dao.OrderDao;
import com.dao.UserDao;
import com.model.Medicine;
import com.model.Order;
import com.model.OrderItem;
import com.model.OrderStatus;
import com.model.User;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:8080")
public class OrderController {

    @Autowired private OrderDao orderDao;
    @Autowired private UserDao userDao;
    @Autowired private EmailService emailService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderDao.findAll());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Order order = orderDao.findById(orderId).orElse(null);
        if (order == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(order);
    }

    @PostMapping("/place")
    public ResponseEntity<Map<String, Object>> placeOrder(
            @RequestParam Long userId,
            @RequestBody List<Map<String, Object>> cartItems) {

        User user = userDao.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("error", "User not found"));
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.PENDING);

        double total = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (Map<String, Object> item : cartItems) {
            double price    = ((Number) item.get("price")).doubleValue();
            int    quantity = ((Number) item.get("quantity")).intValue();
            Long   medId    = ((Number) item.get("id")).longValue();

            total += price * quantity;

            Medicine med = new Medicine();
            med.setId(medId);

            OrderItem oi = new OrderItem();
            oi.setMedicine(med);
            oi.setQuantity(quantity);
            oi.setOrder(order);

            orderItems.add(oi);
        }

        order.setTotalAmount(total);
        order.setOrderItems(orderItems);

        order = orderDao.save(order);

        emailService.sendSimpleEmail(
            user.getEmail(),
            "Order Placed",
            "Hi " + user.getName() +
            ", your order (ID: " + order.getOrderId() + ") has been placed and is pending admin approval.");

        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(Map.of(
                                 "orderId", order.getOrderId(),
                                 "message", "Order placed successfully. Pending admin approval."));
    }

    @PostMapping("/admin/createOrderFromPrescription")
    public ResponseEntity<Map<String, Object>> createOrderFromPrescription(@RequestBody Map<String, Object> request) {
        Long userId = Long.parseLong(request.get("userId").toString());
        List<Map<String, Object>> medicines = (List<Map<String, Object>>) request.get("medicines");

        User user = userDao.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.APPROVED);

        double total = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (Map<String, Object> item : medicines) {
            double price    = ((Number) item.get("price")).doubleValue();
            int    quantity = ((Number) item.get("quantity")).intValue();
            Long   medId    = ((Number) item.get("medicineId")).longValue();

            total += price * quantity;

            Medicine med = new Medicine();
            med.setId(medId);

            OrderItem oi = new OrderItem();
            oi.setMedicine(med);
            oi.setQuantity(quantity);
            oi.setOrder(order);

            orderItems.add(oi);
        }

        order.setTotalAmount(total);
        order.setOrderItems(orderItems);

        orderDao.save(order);

        emailService.sendSimpleEmail(
            user.getEmail(),
            "Prescription Verified & Order Created",
            "Hi " + user.getName() +
            ", your prescription has been verified. An order (ID: " + order.getOrderId() + ") has been created and approved. You may now proceed with payment.");

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
            "orderId", order.getOrderId(),
            "message", "Order created from prescription successfully."
        ));
    }

    @PutMapping("/{orderId}/pay")
    public ResponseEntity<String> markOrderAsPaid(@PathVariable Long orderId) {
        Order order = orderDao.findById(orderId).orElse(null);
        if (order == null) return ResponseEntity.notFound().build();

        if (order.getStatus() != OrderStatus.APPROVED) {
            return ResponseEntity.badRequest().body("Order must be approved before payment.");
        }

        order.setStatus(OrderStatus.PAID);
        orderDao.update(order);

        emailService.sendSimpleEmail(
            order.getUser().getEmail(),
            "Payment Confirmed",
            "Hi " + order.getUser().getName() +
            ", your payment for order ID " + order.getOrderId() + " has been received."
        );

        return ResponseEntity.ok("Order marked as paid.");
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> body) {

        OrderStatus status;
        try {
            status = OrderStatus.valueOf(body.get("status").toUpperCase());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid status value");
        }

        Order order = orderDao.findById(orderId).orElse(null);
        if (order == null) return ResponseEntity.notFound().build();

        if (status == OrderStatus.SHIPPED && order.getStatus() != OrderStatus.PAID) {
            return ResponseEntity.badRequest().body("Order must be paid before shipping.");
        }
        if (status == OrderStatus.PAID) {
            return ResponseEntity.badRequest().body("Only users can mark as PAID.");
        }

        order.setStatus(status);
        orderDao.update(order);

        if (status == OrderStatus.APPROVED) {
            emailService.sendSimpleEmail(
                order.getUser().getEmail(),
                "Order Approved",
                "Hi " + order.getUser().getName()
                  + ", your order (ID: " + order.getOrderId() + ") has been approved!");
        } else if (status == OrderStatus.REJECTED) {
            emailService.sendSimpleEmail(
                order.getUser().getEmail(),
                "Order Rejected",
                "Hi " + order.getUser().getName()
                  + ", unfortunately your order (ID: " + order.getOrderId() + ") was rejected.");
        } else if (status == OrderStatus.DELIVERED) {
            emailService.sendSimpleEmail(
                order.getUser().getEmail(),
                "Order Delivered",
                "Hi " + order.getUser().getName()
                  + ", your order (ID: " + order.getOrderId() + ") has been delivered. Thank you!");
        } else if (status == OrderStatus.SHIPPED) {
            emailService.sendSimpleEmail(
                order.getUser().getEmail(),
                "Order Shipped",
                "Hi " + order.getUser().getName()
                  + ", your order (ID: " + order.getOrderId() + ") has been shipped and is on the way!");
        }

        return ResponseEntity.ok("Order status updated to " + status);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Order>> getPendingOrders(@RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin == null || !"ADMIN".equalsIgnoreCase(admin.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(orderDao.findByStatus(OrderStatus.PENDING));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderDao.findByUserId(userId));
    }
}
