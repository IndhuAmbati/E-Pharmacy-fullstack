package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.model.Notification;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class NotificationDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Notification> findAll() {
        return entityManager.createQuery("FROM Notification", Notification.class).getResultList();
    }

    public Optional<Notification> findById(Long id) {
        Notification notification = entityManager.find(Notification.class, id);
        return notification != null ? Optional.of(notification) : Optional.empty();
    }

    public void save(Notification notification) {
        entityManager.persist(notification);
    }

    public Notification update(Notification notification) {
        return entityManager.merge(notification);
    }

    public void deleteById(Long id) {
        Notification notification = entityManager.find(Notification.class, id);
        if (notification != null) {
            entityManager.remove(notification);
        }
    }

    // Get notifications by userId
    public List<Notification> findByUserId(Long userId) {
        return entityManager.createQuery("FROM Notification n WHERE n.user.id = :userId", Notification.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
