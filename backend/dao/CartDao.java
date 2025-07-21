package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.model.Cart;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class CartDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Cart> findAll() {
        return entityManager.createQuery("FROM Cart", Cart.class).getResultList();
    }

    public Optional<Cart> findById(Long id) {
        Cart cart = entityManager.find(Cart.class, id);
        return cart != null ? Optional.of(cart) : Optional.empty();
    }

    public void save(Cart cart) {
        if (cart.getId() == null) {
            entityManager.persist(cart);
        } else {
            entityManager.merge(cart);
        }
    }

    public void deleteById(Long id) {
        findById(id).ifPresent(entityManager::remove);
    }

    public List<Cart> findByUserId(Long userId) {
        return entityManager
                .createQuery("FROM Cart c WHERE c.user.id = :userId", Cart.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
