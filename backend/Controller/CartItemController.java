// Backend - CartItemController.java
package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.dao.CartDao;
import com.dao.CartItemDao;
import com.dao.MedicineDao;
import com.dao.UserDao;
import com.model.Cart;
import com.model.CartItem;
import com.model.Medicine;
import com.model.User;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/cartItem")
public class CartItemController {

    @Autowired
    private CartItemDao cartItemDao;

    @Autowired
    private CartDao cartDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private MedicineDao medicineDao;

    @PostMapping("/add")
    public CartItem addCartItem(@RequestParam Long userId, @RequestParam Long medicineId, @RequestParam int quantity) {
        User user = userDao.findById(userId).orElse(null);
        Medicine medicine = medicineDao.findById(medicineId).orElse(null);

        if (user != null && "USER".equalsIgnoreCase(user.getRole()) && medicine != null) {
            Cart cart = cartDao.findByUserId(userId).stream().findFirst().orElse(null);

            if (cart == null) {
                cart = new Cart();
                cart.setUser(user);
                cartDao.save(cart);
            }

            // Check if item already exists and update quantity
            CartItem existingItem = cart.getCartItems().stream()
                .filter(ci -> ci.getMedicine().getId().equals(medicineId))
                .findFirst()
                .orElse(null);

            if (existingItem != null) {
                existingItem.setQuantity(existingItem.getQuantity() + quantity);
                return cartItemDao.save(existingItem);
            } else {
                CartItem item = new CartItem();
                item.setCart(cart);
                item.setMedicine(medicine);
                item.setQuantity(quantity);
                return cartItemDao.save(item);
            }
        } else {
            throw new RuntimeException("User or medicine not found.");
        }
    }

    @GetMapping("/user/{userId}")
    public List<CartItem> getCartItemsByUser(@PathVariable Long userId) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null && "USER".equalsIgnoreCase(user.getRole())) {
            return cartItemDao.findByUserId(userId);
        } else {
            throw new RuntimeException("User not found or not authorized.");
        }
    }

    @PutMapping("/update")
    public CartItem updateCartItem(@RequestParam Long userId, @RequestBody CartItem updatedItem) {
        User user = userDao.findById(userId).orElse(null);
        CartItem existing = cartItemDao.findById(updatedItem.getId()).orElse(null);

        if (user != null && "USER".equalsIgnoreCase(user.getRole())
                && existing != null
                && existing.getCart().getUser().getId().equals(userId)) {
            existing.setQuantity(updatedItem.getQuantity());
            return cartItemDao.save(existing);
        } else {
            throw new RuntimeException("Not authorized or cart item not found.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCartItem(@PathVariable Long id, @RequestParam Long userId) {
        CartItem item = cartItemDao.findById(id).orElse(null);
        if (item != null && item.getCart().getUser().getId().equals(userId)) {
            cartItemDao.deleteById(id);
            return "Cart item deleted.";
        } else {
            throw new RuntimeException("Unauthorized delete attempt.");
        }
    }

    @GetMapping("/all")
    public List<CartItem> getAllCartItems(@RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            return cartItemDao.findAll();
        } else {
            throw new RuntimeException("Only admin can view all cart items.");
        }
    }
}