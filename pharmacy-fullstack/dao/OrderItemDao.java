package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.OrderItem;

@Service
public class OrderItemDao {
	private final OrderItemRepository orderItemRepo;

    @Autowired
    public OrderItemDao(OrderItemRepository orderItemRepo) {
        this.orderItemRepo = orderItemRepo;
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepo.findAll();
    }

    public OrderItem getOrderItemById(Integer id) {
        return orderItemRepo.findById(id).orElse(null);
    }

    public List<OrderItem> getOrderItemsByOrderId(Integer orderId) {
        return orderItemRepo.findByOrderId(orderId);
    }
}
