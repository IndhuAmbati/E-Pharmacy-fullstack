package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.model.Prescription;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class PrescriptionDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Prescription> findAll() {
        return entityManager.createQuery("FROM Prescription", Prescription.class).getResultList();
    }

    public Optional<Prescription> findById(Long id) {
        return Optional.ofNullable(entityManager.find(Prescription.class, id));
    }

    @Transactional
    public Prescription save(Prescription prescription) {
        if (prescription.getPrescriptionId() == null) {
            entityManager.persist(prescription);
            return prescription;
        } else {
            return entityManager.merge(prescription);
        }
    }

    @Transactional
    public void deleteById(Long id) {
        Prescription prescription = entityManager.find(Prescription.class, id);
        if (prescription != null) {
            entityManager.remove(prescription);
        }
    }

    public List<Prescription> findByUserId(Long userId) {
        return entityManager.createQuery(
                "SELECT p FROM Prescription p WHERE p.user.id = :userId", Prescription.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
