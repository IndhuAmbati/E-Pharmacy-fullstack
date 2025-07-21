package com.dao;

import com.model.Medicine;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class MedicineDao {

    @PersistenceContext
    private EntityManager entityManager;

    public Medicine save(Medicine medicine) {
        entityManager.persist(medicine);
        return medicine;
    }

    public List<Medicine> findAll() {
        return entityManager.createQuery("FROM Medicine", Medicine.class).getResultList();
    }

    public Optional<Medicine> findById(Long id) {
        return Optional.ofNullable(entityManager.find(Medicine.class, id));
    }

    public Medicine update(Medicine medicine) {
        return entityManager.merge(medicine);
    }

    public void deleteById(Long id) {
        Medicine medicine = entityManager.find(Medicine.class, id);
        if (medicine != null) {
            entityManager.remove(medicine);
        }
    }
}
