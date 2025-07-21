package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.model.Order;
import com.model.OrderStatus;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class OrderDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Order> findAll() {
        return entityManager.createQuery("FROM Order", Order.class).getResultList();
    }

    public Optional<Order> findById(Long id) {
        return Optional.ofNullable(entityManager.find(Order.class, id));
    }

    public Order update(Order order) {
        return entityManager.merge(order);
    }

    public void deleteById(Long id) {
        Order order = entityManager.find(Order.class, id);
        if (order != null) {
            entityManager.remove(order);
        }
    }

    // ✅ Updated: Eagerly load orderItems and medicine
    public List<Order> findByUserId(Long userId) {
        return entityManager.createQuery(
            "SELECT DISTINCT o FROM Order o " +
            "LEFT JOIN FETCH o.orderItems oi " +
            "LEFT JOIN FETCH oi.medicine " +
            "WHERE o.user.id = :userId", Order.class)
            .setParameter("userId", userId)
            .getResultList();
    }

    public List<Order> findByStatus(OrderStatus status) {
        return entityManager.createQuery("FROM Order o WHERE o.status = :status", Order.class)
                .setParameter("status", status)
                .getResultList();
    }

    public Order save(Order order) {
        entityManager.persist(order);
        return order;
    }
}
