package com.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.dao.AddressDao;
import com.dao.UserDao;
import com.model.Address;
import com.model.User;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private UserDao userDao;

    @PostMapping("/add")
    public Address addAddress(@RequestParam Long userId, @RequestBody Address address) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null && "USER".equalsIgnoreCase(user.getRole())) {
            address.setUser(user);
            return addressDao.save(address);
        } else {
            throw new RuntimeException("Only users can add addresses.");
        }
    }

    @GetMapping("/user/{userId}")
    public List<Address> getUserAddresses(@PathVariable Long userId) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null && "USER".equalsIgnoreCase(user.getRole())) {
            return addressDao.findByUserId(userId);
        } else {
            throw new RuntimeException("User not found or not authorized.");
        }
    }

    @PutMapping("/update")
    public Address updateAddress(@RequestParam Long userId, @RequestBody Address updatedAddress) {
        User user = userDao.findById(userId).orElse(null);
        Address existing = addressDao.findById(updatedAddress.getId()).orElse(null);

        if (user != null && "USER".equalsIgnoreCase(user.getRole())
                && existing != null && existing.getUser().getId().equals(userId)) {
            updatedAddress.setUser(user);
            return addressDao.save(updatedAddress);
        } else {
            throw new RuntimeException("Not authorized to update this address.");
        }
    }

    @DeleteMapping("/delete/{addressId}")
    public String deleteAddress(@PathVariable Long addressId, @RequestParam Long userId) {
        Address address = addressDao.findById(addressId).orElse(null);
        if (address != null && address.getUser().getId().equals(userId)) {
            addressDao.deleteById(addressId);
            return "Address deleted successfully.";
        } else {
            throw new RuntimeException("Not authorized to delete this address.");
        }
    }

    @GetMapping("/all")
    public List<Address> getAllAddresses(@RequestParam Long adminId) {
        User admin = userDao.findById(adminId).orElse(null);
        if (admin != null && "ADMIN".equalsIgnoreCase(admin.getRole())) {
            return addressDao.findAll();
        } else {
            throw new RuntimeException("Only admin can view all addresses.");
        }
    }
}
