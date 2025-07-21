package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.model.Admin;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class AdminDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Admin> findAll() {
        return entityManager.createQuery("FROM Admin", Admin.class).getResultList();
    }

    public Optional<Admin> findById(Long id) {
        Admin admin = entityManager.find(Admin.class, id);
        return admin != null ? Optional.of(admin) : Optional.empty();
    }

    public void save(Admin admin) {
        if (admin.getId() == null) {
            entityManager.persist(admin);
        } else {
            entityManager.merge(admin);
        }
    }

    public void deleteById(Long id) {
        findById(id).ifPresent(entityManager::remove);
    }

    public Optional<Admin> findByEmail(String email) {
        List<Admin> result = entityManager.createQuery("FROM Admin a WHERE a.email = :email", Admin.class)
                .setParameter("email", email)
                .getResultList();
        if (result.isEmpty()) {
            return Optional.empty();
        } else {
            return Optional.of(result.get(0));
        }
    }
}
