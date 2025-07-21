package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dao.CartDao;
import com.dao.UserDao;
import com.model.Cart;
import com.model.User;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private UserDao userDao;

    
    // 1. Add cart (User)
    @PostMapping("/add")
    public Cart addCart(@RequestParam Long userId, @RequestBody Cart cart) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null && "USER".equalsIgnoreCase(user.getRole())) {
            cart.setUser(user);
            cartDao.save(cart);
            return cart;
        } else {
            throw new RuntimeException("Only users can add carts.");
        }
    }

    // 2. Get all carts for a user (User)
    @GetMapping("/user/{userId}")
    public List<Cart> getCartsByUser(@PathVariable Long userId) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null && "USER".equalsIgnoreCase(user.getRole())) {
            return cartDao.findByUserId(userId);
        } else {
            throw new RuntimeException("User not found or not authorized.");
        }
    }

    // 3. Get all carts (Admin)
    @GetMapping("/all")
    public List<Cart> getAllCarts(@RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            return cartDao.findAll();
        } else {
            throw new RuntimeException("Only admin can view all carts.");
        }
    }

    // 4. Delete cart by ID
    @DeleteMapping("/delete/{cartId}")
    public String deleteCart(@PathVariable Long cartId) {
        cartDao.deleteById(cartId);
        return "Cart deleted successfully.";
    }
}
