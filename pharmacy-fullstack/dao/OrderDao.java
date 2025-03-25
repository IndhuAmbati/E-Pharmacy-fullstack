package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Order;

@Service
public class OrderDao {
	private final OrderRepository orderRepo;

    @Autowired
    public OrderDao(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order getOrderById(Integer id) {
        return orderRepo.findById(id).orElse(null);
    }

    public List<Order> getOrdersByUserId(Integer userId) {
        return orderRepo.getOrdersByUserId(userId);
    }
}
