package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.dao.OrderItemRepository;
import com.dao.OrderDao;
import com.dao.UserDao;
import com.model.Order;
import com.model.OrderItem;
import com.model.User;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserDao userDao;

    // 1. ✅ Add an order item to a specific order
    @PostMapping("/add")
    public OrderItem addOrderItem(@RequestParam Long orderId, @RequestBody OrderItem orderItem) {
        Order order = orderDao.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        orderItem.setOrder(order);
        return orderItemRepository.save(orderItem);
    }

    // 2. ✅ Get all items by order ID
    @GetMapping("/order/{orderId}")
    public List<OrderItem> getOrderItemsByOrderId(@PathVariable Long orderId) {
        return orderItemRepository.findByOrder_OrderId(orderId);
    }

    // 3. ✅ Update an order item (admin only)
    @PutMapping("/update")
    public OrderItem updateOrderItem(@RequestParam Long adminId, @RequestBody OrderItem orderItem) {
        User admin = userDao.findById(adminId).orElseThrow(() -> new RuntimeException("Admin not found"));
        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException("Only admin can update order items.");
        }
        return orderItemRepository.save(orderItem);
    }

    // 4. ✅ Delete order item (admin only)
    @DeleteMapping("/delete/{id}")
    public String deleteOrderItem(@PathVariable Long id, @RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElseThrow(() -> new RuntimeException("Admin not found"));
        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException("Only admin can delete order items.");
        }
        orderItemRepository.deleteById(id);
        return "Order item deleted successfully";
    }

    // 5. ✅ Get all order items (admin only)
    @GetMapping("/all")
    public List<OrderItem> getAllOrderItems(@RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElseThrow(() -> new RuntimeException("Admin not found"));
        if (!"ADMIN".equalsIgnoreCase(admin.getRole())) {
            throw new RuntimeException("Only admin can view all order items.");
        }
        return orderItemRepository.findAll();
    }
}
