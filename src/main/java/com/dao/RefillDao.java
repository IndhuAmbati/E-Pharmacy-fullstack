package com.dao;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.model.Refill;
import com.model.User;

@Repository
@Transactional
public class RefillDao {

    @PersistenceContext
    private EntityManager entityManager;

    public Refill save(Refill refill) {
        if (refill.getRefillId() == null) {
            entityManager.persist(refill);
            return refill;
        } else {
            return entityManager.merge(refill);
        }
    }

    public Refill findById(Long id) {
        return entityManager.find(Refill.class, id);
    }

    public List<Refill> findAll() {
        return entityManager.createQuery("SELECT r FROM Refill r", Refill.class).getResultList();
    }

    public List<Refill> findByUser(User user) {
        return entityManager.createQuery("SELECT r FROM Refill r WHERE r.user = :user", Refill.class)
                .setParameter("user", user)
                .getResultList();
    }

    public void deleteById(Long id) {
        Refill refill = entityManager.find(Refill.class, id);
        if (refill != null) {
            entityManager.remove(refill);
        }
    }
}
