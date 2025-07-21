package com.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.model.FeedBack;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class FeedBackDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<FeedBack> findAll() {
        return entityManager.createQuery("FROM FeedBack", FeedBack.class).getResultList();
    }

    public FeedBack findById(Long id) {
        return entityManager.find(FeedBack.class, id);
    }

    public void save(FeedBack feedback) {
        entityManager.persist(feedback);
    }

    public void update(FeedBack feedback) {
        entityManager.merge(feedback);
    }

    public void deleteById(Long id) {
        FeedBack feedback = findById(id);
        if (feedback != null) {
            entityManager.remove(feedback);
        }
    }

    // Add this method:
    public List<FeedBack> findByUserId(Long userId) {
        return entityManager
            .createQuery("FROM FeedBack f WHERE f.user.id = :userId", FeedBack.class)
            .setParameter("userId", userId)
            .getResultList();
    }
}
