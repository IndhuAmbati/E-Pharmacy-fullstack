package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.model.CartItem;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class CartItemDao {

    @PersistenceContext
    private EntityManager entityManager;

    // Save or update
    public CartItem save(CartItem cartItem) {
        if (cartItem.getId() == null) {
            entityManager.persist(cartItem);
            return cartItem;
        } else {
            return entityManager.merge(cartItem);
        }
    }

    // Find all cart items
    public List<CartItem> findAll() {
        return entityManager.createQuery("FROM CartItem", CartItem.class).getResultList();
    }

    // Find cart item by ID
    public Optional<CartItem> findById(Long id) {
        CartItem cartItem = entityManager.find(CartItem.class, id);
        return cartItem != null ? Optional.of(cartItem) : Optional.empty();
    }

    // Delete by ID
    public void deleteById(Long id) {
        findById(id).ifPresent(entityManager::remove);
    }

    // ✅ Find CartItems by User ID (via Cart -> User)
    public List<CartItem> findByUserId(Long userId) {
        return entityManager.createQuery(
                "SELECT ci FROM CartItem ci WHERE ci.cart.user.id = :userId", CartItem.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    // Find by Cart ID (optional helper)
    public List<CartItem> findByCartId(Long cartId) {
        return entityManager.createQuery(
                "SELECT ci FROM CartItem ci WHERE ci.cart.id = :cartId", CartItem.class)
                .setParameter("cartId", cartId)
                .getResultList();
    }
}
