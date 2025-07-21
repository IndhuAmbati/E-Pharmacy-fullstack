package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.model.Order;
import com.model.Payment;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Repository
@Transactional
public class PaymentDao {

    @PersistenceContext
    private EntityManager em;

    public List<Payment> findAll() {
        TypedQuery<Payment> query = em.createQuery("SELECT p FROM Payment p", Payment.class);
        return query.getResultList();
    }

    public Optional<Payment> findById(Long paymentId) {
        Payment payment = em.find(Payment.class, paymentId);
        return Optional.ofNullable(payment);
    }

    public Payment save(Payment payment) {
        if (payment.getPaymentId() == null) {
            em.persist(payment);
            return payment;
        } else {
            return em.merge(payment);
        }
    }

    public void deleteById(Long paymentId) {
        findById(paymentId).ifPresent(em::remove);
    }

    public List<Payment> findAllByOrder_UserId(Long userId) {
        TypedQuery<Payment> query = em.createQuery(
            "SELECT p FROM Payment p WHERE p.order.user.userId = :userId", Payment.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    public Optional<Payment> findByOrder(Order order) {
        TypedQuery<Payment> query = em.createQuery(
            "SELECT p FROM Payment p WHERE p.order = :order", Payment.class);
        query.setParameter("order", order);
        List<Payment> results = query.getResultList();
        if (results.isEmpty()) return Optional.empty();
        return Optional.of(results.get(0));
    }
}
