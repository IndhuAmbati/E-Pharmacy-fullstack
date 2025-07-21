package com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Order;
import com.model.OrderStatus;
import com.model.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = {"orderItems", "orderItems.medicine"})
	List<Order> findByUser(User user);

    List<Order> findByStatus(OrderStatus status);
}