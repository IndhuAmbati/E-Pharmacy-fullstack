package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("from Order where id = :id")
    Optional<Order> getOrderById(@Param("id") Integer id);

    @Query("from Order where user.id = :userId")
    List<Order> getOrdersByUserId(@Param("userId") Integer userId);
}
