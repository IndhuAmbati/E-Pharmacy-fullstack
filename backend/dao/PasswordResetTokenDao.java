package com.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.model.PasswordResetToken;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class PasswordResetTokenDao {

    @PersistenceContext
    private EntityManager entityManager;

    public void save(PasswordResetToken token) {
        entityManager.persist(token);
    }

    public PasswordResetToken update(PasswordResetToken token) {
        return entityManager.merge(token);
    }

    public PasswordResetToken findByToken(String token) {
        List<PasswordResetToken> tokens = entityManager.createQuery(
            "FROM PasswordResetToken t WHERE t.token = :token", PasswordResetToken.class)
            .setParameter("token", token)
            .getResultList();
        return tokens.isEmpty() ? null : tokens.get(0);
    }

    public void deleteById(Long id) {
        PasswordResetToken token = entityManager.find(PasswordResetToken.class, id);
        if (token != null) {
            entityManager.remove(token);
        }
    }

    public void deleteByToken(String token) {
        PasswordResetToken prt = findByToken(token);
        if (prt != null) {
            entityManager.remove(prt);
        }
    }
}
