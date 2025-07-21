package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.model.OrderItem;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class OrderItemDao {

    @PersistenceContext
    private EntityManager entityManager;

    public OrderItem save(OrderItem item) {
        entityManager.persist(item);
        return item;
    }

    public OrderItem update(OrderItem item) {
        return entityManager.merge(item);
    }

    public void deleteById(Long id) {
        OrderItem item = entityManager.find(OrderItem.class, id);
        if (item != null) {
            entityManager.remove(item);
        }
    }

    public Optional<OrderItem> findById(Long id) {
        return Optional.ofNullable(entityManager.find(OrderItem.class, id));
    }

    public List<OrderItem> findAll() {
        return entityManager.createQuery("FROM OrderItem", OrderItem.class).getResultList();
    }

    public List<OrderItem> findByOrderId(Long orderId) {
        return entityManager
                .createQuery("FROM OrderItem oi WHERE oi.order.orderId = :orderId", OrderItem.class)
                .setParameter("orderId", orderId)
                .getResultList();
    }
}
