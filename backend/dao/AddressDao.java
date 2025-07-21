package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.model.Address;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class AddressDao {

    @PersistenceContext
    private EntityManager entityManager;

    // Get all addresses
    public List<Address> findAll() {
        return entityManager.createQuery("FROM Address", Address.class).getResultList();
    }

    // Find address by ID
    public Optional<Address> findById(Long id) {
        Address address = entityManager.find(Address.class, id);
        return address != null ? Optional.of(address) : Optional.empty();
    }

    // Save or update address
    public Address save(Address address) {
        if (address.getId() == null) {
            entityManager.persist(address);
            return address;
        } else {
            return entityManager.merge(address);
        }
    }

    // Delete address by ID
    public void deleteById(Long id) {
        findById(id).ifPresent(entityManager::remove);
    }

    // Get all addresses for a specific user
    public List<Address> findByUserId(Long userId) {
        return entityManager
                .createQuery("FROM Address a WHERE a.user.id = :userId", Address.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
