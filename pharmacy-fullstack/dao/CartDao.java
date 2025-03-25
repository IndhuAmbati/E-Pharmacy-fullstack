package com.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Cart;

@Service
public class CartDao {
	private final CartRepository cartRepo;

    @Autowired
    public CartDao(CartRepository cartRepo) {
        this.cartRepo = cartRepo;
    }

    public List<Cart> getAllCarts() {
        return cartRepo.findAll();
    }

    public Cart getCartById(Integer id) {
        return cartRepo.findById(id).orElse(null);
    }
}
