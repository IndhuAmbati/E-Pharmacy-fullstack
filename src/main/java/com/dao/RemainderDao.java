package com.dao;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.model.Remainder;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class RemainderDao {

    @PersistenceContext
    private EntityManager entityManager;
    public List<Remainder> findByUserIdAndReminderTimeBetween(Long userId, Date start, Date end) {
        return entityManager.createQuery(
            "SELECT r FROM Remainder r WHERE r.user.id = :userId AND r.reminderTime BETWEEN :start AND :end", Remainder.class)
            .setParameter("userId", userId)
            .setParameter("start", start)
            .setParameter("end", end)
            .getResultList();
    }

    // Get all remainders (for admin)
    public List<Remainder> findAll() {
        return entityManager.createQuery("FROM Remainder", Remainder.class).getResultList();
    }

    // Find remainder by id
    public Optional<Remainder> findById(Long id) {
        return Optional.ofNullable(entityManager.find(Remainder.class, id));
    }

    // Save or update remainder
    public Remainder save(Remainder remainder) {
        if (remainder.getId() == null) {
            entityManager.persist(remainder);
            return remainder;
        } else {
            return entityManager.merge(remainder);
        }
    }

    // Delete remainder by id
    public void deleteById(Long id) {
        Remainder remainder = entityManager.find(Remainder.class, id);
        if (remainder != null) {
            entityManager.remove(remainder);
        }
    }

    // Find all remainders by user id (for user)
    public List<Remainder> findByUserId(Long userId) {
        return entityManager.createQuery("SELECT r FROM Remainder r WHERE r.user.id = :userId", Remainder.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
