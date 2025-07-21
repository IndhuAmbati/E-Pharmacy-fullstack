package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dao.RefillRepository;
import com.dao.UserDao;
import com.model.Refill;
import com.model.User;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/refill")
public class RefillController {

    @Autowired
    private RefillRepository refillRepository;

    @Autowired
    private UserDao userDao;

    // User: Add refill entry
    @PostMapping("/user/add")
    public Refill addRefill(@RequestParam Long userId, @RequestBody Refill refill) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null) {
            refill.setUser(user);
            return refillRepository.save(refill);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // User: Get all refill entries for their own userId
    @GetMapping("/user/{userId}")
    public List<Refill> getUserRefills(@PathVariable Long userId) {
        User user = userDao.findById(userId).orElse(null);
        if (user != null) {
            return refillRepository.findByUser(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Admin: Get all refill entries for all users
    @GetMapping("/admin/all")
    public List<Refill> getAllRefills() {
        return refillRepository.findAll();
    }

    // User: Update refill info (only their own)
    @PutMapping("/user/update/{refillId}")
    public Refill updateRefill(@PathVariable Long refillId, @RequestBody Refill refillDetails, @RequestParam Long userId) {
        Refill refill = refillRepository.findById(refillId).orElse(null);
        if (refill != null) {
            // Check if refill belongs to the userId making request
            if (!refill.getUser().getId().equals(userId)) {
                throw new RuntimeException("Unauthorized: Cannot update refill not owned by you");
            }
            refill.setMedicineName(refillDetails.getMedicineName());
            refill.setTabletsLeft(refillDetails.getTabletsLeft());
            refill.setExpectedFinishDate(refillDetails.getExpectedFinishDate());
            return refillRepository.save(refill);
        } else {
            throw new RuntimeException("Refill entry not found");
        }
    }

    // Admin: Delete refill entry by id
    @DeleteMapping("/admin/delete/{refillId}")
    public String deleteRefill(@PathVariable Long refillId) {
        refillRepository.deleteById(refillId);
        return "Refill entry deleted successfully";
    }
}
