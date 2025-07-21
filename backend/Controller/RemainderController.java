package com.Controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.dao.RemainderDao;
import com.model.Remainder;

@RestController
@RequestMapping("/api/remainders")
@CrossOrigin(origins = "http://localhost:8080")
public class RemainderController {

    @Autowired
    private RemainderDao remainderDao;

    @GetMapping("/upcoming")
    public List<Remainder> getUpcomingRemainders(@RequestParam Long userId) {
        Date now = new Date();
        Date next10Minutes = new Date(now.getTime() + 10 * 60 * 1000); // 10 mins later

        return remainderDao.findByUserIdAndReminderTimeBetween(userId, now, next10Minutes);
    }

    // Get all remainders (Admin)
    @GetMapping("/admin/all")
    public ResponseEntity<List<Remainder>> getAllRemaindersAdmin() {
        List<Remainder> list = remainderDao.findAll();
        if (list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(list);
        }
        return ResponseEntity.ok(list);
    }

    // Delete remainder by id (Admin)
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteRemainderAdmin(@PathVariable Long id) {
        Optional<Remainder> existing = remainderDao.findById(id);
        if (existing.isPresent()) {
            remainderDao.deleteById(id);
            return ResponseEntity.ok("Remainder deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Remainder not found.");
        }
    }

    // --- USER APIs ---

    // Get all remainders for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Remainder>> getRemaindersByUser(@PathVariable Long userId) {
        List<Remainder> list = remainderDao.findByUserId(userId);
        if (list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(list);
        }
        return ResponseEntity.ok(list);
    }

    // Get remainder by id (only if belongs to user)
    @GetMapping("/user/{userId}/{id}")
    public ResponseEntity<?> getRemainderByIdForUser(@PathVariable Long userId, @PathVariable Long id) {
        Optional<Remainder> remainder = remainderDao.findById(id);
        if (remainder.isPresent() && remainder.get().getUser().getId().equals(userId)) {
            return ResponseEntity.ok(remainder.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Remainder not found for this user.");
        }
    }

    // Add new remainder for user
    @PostMapping("/user/")
    public ResponseEntity<Remainder> addRemainderForUser(@RequestBody Remainder remainder) {
        // Ideally validate remainder.user.id matches the authenticated user
        Remainder saved = remainderDao.save(remainder);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Update remainder (user can only update their own)
    @PutMapping("/user/")
    public ResponseEntity<?> updateRemainderForUser(@RequestBody Remainder remainder) {
        if (remainder.getId() == null) {
            return ResponseEntity.badRequest().body("Remainder ID is required for update.");
        }
        Optional<Remainder> existing = remainderDao.findById(remainder.getId());
        if (existing.isPresent()) {
            // Check user matches
            if (!existing.get().getUser().getId().equals(remainder.getUser().getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only update your own remainders.");
            }
            Remainder updated = remainderDao.save(remainder);
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Remainder not found.");
        }
    }

}
